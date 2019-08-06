require('dotenv').config();
const moment = require('moment');
const bankScraper = require('./bankScraper');
const ynab = require('./outputVendors/ynab/ynab');
const googleSheets = require('./outputVendors/googleSheets/googleSheets');
const categoryCalculation = require('./categoryCalculationScript');
const emailSender = require('./emailSender');
const configManager = require('./configManager');

const TRANSACTION_STATUS_COMPLETED = 'completed';

async function scrapeAndUpdateOutputVendors() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  const outputVendors = [
    {
      name: 'ynab',
      createTransactionFunction: ynab.createTransactions,
      options: config.outputVendors.ynab.options
    },
    {
      name: 'googleSheets',
      createTransactionFunction: googleSheets.createTransactionsInGoogleSheets,
      options: config.outputVendors.googleSheets.options
    }
  ];

  const executionResult = {};
  const accountsToScrape = config.scraping.accountsToScrape;
  for (let i = 0; i < accountsToScrape.length; i++) {
    const { companyId, credentials } = accountsToScrape[i];
    executionResult[companyId] = {};
    try {
      const scrapeResult = await fetchTransactions(companyId, credentials, startDate, config);
      let transactions = classifyTransactionCategories(scrapeResult, companyId);
      // Filter out pending transactions
      transactions = transactions.filter(transaction => transaction.status === TRANSACTION_STATUS_COMPLETED);
      transactions.sort(transactionsDateComperator);

      for (let j = 0; j < outputVendors.length; j++) {
        const vendor = outputVendors[j];
        if (config.outputVendors[vendor.name].active) {
          const vendorResult = await createTransactionsInVedor(vendor, transactions, startDate);
          executionResult[companyId][vendor.name] = vendorResult;
        }
      }
      console.log('=================== Finished for ', companyId, ' ===================');
    } catch (e) {
      executionResult[companyId] = `Error running job for company ${companyId}. Error: ${e.message}`;
      console.error(`Error running job for company ${companyId}. Error: `, e);
      throw e;
    }
  }

  const resultToLog = `
    Results of job:
    ${JSON.stringify(executionResult, null, 2)}
  `;
  console.log(resultToLog);

  if (config.monitoring.email.sendReport) {
    await emailSender.sendEmail({ text: resultToLog });
  }

  return executionResult;
}

async function fetchTransactions(companyId, credentials, startDate, config) {
  console.log('=================== Starting for ', companyId, ' ===================');

  console.log(`Start scraping ${companyId} from date: ${moment(startDate).format('DD/MM/YYYY')}`);
  const scrapeResult = await bankScraper.scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: config.scraping.showBrowser
  });
  if (!scrapeResult.success) {
    console.error('Failed scraping ', companyId);
    console.error(scrapeResult.errorMessage);
    throw new Error(scrapeResult.errorMessage);
  }
  console.log('Finished scraping successfully');
  return scrapeResult;
}

function classifyTransactionCategories(scrapeResult, companyId) {
  console.log('Start category enrichment');

  const transactions = [];
  scrapeResult.accounts.forEach(account => {
    const accountTransactions = account.txns.map(txn => ({
      ...txn,
      companyId,
      accountNumber: account.accountNumber
    }));
    accountTransactions.forEach(accountTransaction => {
      accountTransaction.category = categoryCalculation.getCategoryNameByTransactionDescription(accountTransaction.description);
    });
    transactions.push(...accountTransactions);
  });
  console.log('Finished category enrichment');
  return transactions;
}

async function createTransactionsInVedor(vendor, transactions, startDate) {
  console.log(`Start creating transactions in ${vendor.name}`);
  const vendorResult = await vendor.createTransactionFunction(transactions, startDate, vendor.options);
  if (vendorResult) {
    console.log(`${vendor.name} result: `, vendorResult);
  }
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

module.exports = {
  scrapeAndUpdateOutputVendors,
  configManager
};
