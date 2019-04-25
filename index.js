require("dotenv").config();
const moment = require("moment");
const bankScraper = require("./bankScraper");
const ynab = require("./budgetApps/ynab/ynab");
const googleSheets = require("./budgetApps/googleSheets/googleSheets");
const categoryCalculation = require("./categoryCalculationScript");
const emailSender = require("./emailSender");

const NUM_DAYS_BACK = 4;
const SHOW_BROWSER = process.env.SHOW_BROWSER === "true";

const accountsToScrape = [
  {
    companyId: "leumi",
    credentials: {
      username: process.env.LEUMI_USERNAME,
      password: process.env.LEUMI_PASSWORD
    }
  },
  {
    companyId: "leumiCard",
    credentials: {
      username: process.env.LEUMI_CARD_USERNAME,
      password: process.env.LEUMI_CARD_PASSWORD
    }
  },
  {
    companyId: "visaCal",
    credentials: {
      username: process.env.VISA_CAL_USERNAME,
      password: process.env.VISA_CAL_PASSWORD
    }
  }
];

const OUTPUT_VENDORS = [
  {
    name: "ynab",
    createTransactionFunction: ynab.createTransactions,
    options: {}
  },
  {
    name: "googleSheets",
    createTransactionFunction: googleSheets.createTransactionsInGoogleSheets,
    options: {
      spreadsheetId: process.env.FINANCIAL_MANAGEMENT_SPREADSHEET_ID,
      sheetName: process.env.ALL_TRANSACTIONS_SHEET_NAME
    }
  }
];

const startDate = moment()
  .subtract(NUM_DAYS_BACK, "days")
  .startOf("day")
  .toDate();

async function run() {
  console.log(`Is job: ${process.env.IS_JOB}`);
  const executionResult = {};
  for (let i = 0; i < accountsToScrape.length; i++) {
    const { companyId, credentials } = accountsToScrape[i];
    executionResult[companyId] = {};
    try {
      const scrapeResult = await fetchTransactions(companyId, credentials);
      const transactions = classifyTransactionCategories(
        scrapeResult,
        companyId
      );
      transactions.sort(transactionsDateComperator);

      for (let i = 0; i < OUTPUT_VENDORS.length; i++) {
        const vendor = OUTPUT_VENDORS[i];
        const vendorResult = await createTransactionsInVedor(
          vendor,
          transactions
        );
        executionResult[companyId][vendor.name] = vendorResult;
      }
      console.log(
        "=================== Finished for ",
        companyId,
        " ==================="
      );
    } catch (e) {
      executionResult[
        companyId
      ] = `Error running job for company ${companyId}. Error: ${e.message}`;
    }
  }

  const resultToLog = `
    Results of job:
    ${JSON.stringify(executionResult, null, 2)}
  `;
  console.log(resultToLog);

  if (process.env.IS_JOB) {
    await emailSender.sendEmail({ text: resultToLog });
  }
}

async function fetchTransactions(companyId, credentials) {
  console.log(
    "=================== Starting for ",
    companyId,
    " ==================="
  );

  console.log(
    `Start scraping ${companyId} from date: ${moment(startDate).format(
      "DD/MM/YYYY"
    )}`
  );
  const scrapeResult = await bankScraper.scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: SHOW_BROWSER
  });
  if (!scrapeResult.success) {
    console.error("Failed scraping ", companyId);
    console.error(scrapeResult.errorMessage);
    throw new Error(scrapeResult.errorMessage);
  }
  console.log("Finished scraping successfully");
  return scrapeResult;
}

function classifyTransactionCategories(scrapeResult, companyId) {
  console.log("Start category enrichment");

  const transactions = [];
  scrapeResult.accounts.forEach(account => {
    const accountTransactions = account.txns.map(txn => ({
      ...txn,
      companyId,
      accountNumber: account.accountNumber
    }));
    accountTransactions.forEach(accountTransaction => {
      accountTransaction.category = categoryCalculation.getCategoryNameByTransactionDescription(
        accountTransaction.description
      );
    });
    transactions.push(...accountTransactions);
  });
  console.log("Finished category enrichment");
  return transactions;
}

async function createTransactionsInVedor(vendor, transactions) {
  console.log(`Start creating transactions in ${vendor.name}`);
  const vendorResult = await vendor.createTransactionFunction(
    transactions,
    startDate,
    vendor.options
  );
  vendorResult && console.log(`${vendor.name} result: `, vendorResult);
  console.log(`Finished creating transactions in ${vendor.name}`);
  return vendorResult;
}

function transactionsDateComperator(t1, t2) {
  const date1 = moment(t1.date);
  const date2 = moment(t2.date);
  if (date1.isAfter(date2)) {
    return 1;
  }
  if (date1.isBefore(date2)) {
    return -1;
  }
  return 1;
}

run();
