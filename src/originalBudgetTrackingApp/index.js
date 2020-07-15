import _ from 'lodash';
import moment from 'moment';
import * as bankScraper from './bankScraper';
import * as ynab from './outputVendors/ynab/ynab';
import * as googleSheets from './outputVendors/googleSheets/googleSheets';
import * as categoryCalculation from './categoryCalculationScript';
import * as configManager from './configManager/configManager';
import outputVendors from './outputVendors';

export { outputVendors };
export { configManager };
export const { inputVendors } = bankScraper;

const TRANSACTION_STATUS_COMPLETED = 'completed';
const DATE_FORMAT = 'DD/MM/YYYY';

export const { getYnabAccountDetails } = ynab;

export async function scrapeAndUpdateOutputVendors() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config, startDate);
  try {
    const executionResult = await createTransactionsInExternalVendors(config, companyIdToTransactions, startDate);
    const resultToLog = `
    Results of job:
    ${JSON.stringify(executionResult, null, 2)}
  `;
    console.log(resultToLog);

    return executionResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function scrapeFinancialAccountsAndFetchTransactions(config, startDate) {
  const companyIdToTransactions = {};
  const accountsToScrape = config.scraping.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  for (let i = 0; i < accountsToScrape.length; i++) {
    const { companyId, credentials } = accountsToScrape[i];
    try {
      console.log(`=================== Start fetching transactions for ${companyId} ===================`);
      const scrapeResult = await fetchTransactions(companyId, credentials, startDate, config);
      let transactions = extractTransactionsFromScrapeResult(scrapeResult, companyId);
      transactions = await postProcessTransactions(transactions);
      companyIdToTransactions[companyId] = transactions;
      console.log(`=================== Finished fetching transactions for ${companyId} ===================`);
    } catch (e) {
      console.error(`Error fetching transactions for ${companyId}. Error: `, e);
      throw e;
    }
  }
  return companyIdToTransactions;
}

async function fetchTransactions(companyId, credentials, startDate, config) {
  console.log(`Start scraping ${companyId} from date: ${moment(startDate).format(DATE_FORMAT)}`);
  const scrapeResult = await bankScraper.scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: config.scraping.showBrowser,
  });
  if (!scrapeResult.success) {
    console.error('Failed scraping ', companyId);
    console.error(scrapeResult.errorMessage);
    throw new Error(scrapeResult.errorMessage);
  }
  console.log('Finished scraping successfully');
  return scrapeResult;
}

function extractTransactionsFromScrapeResult(scrapeResult, companyId) {
  const transactions = [];
  scrapeResult.accounts.forEach((account) => {
    const accountTransactions = account.txns.map((txn) => ({
      ...txn,
      companyId,
      accountNumber: account.accountNumber,
    }));
    transactions.push(...accountTransactions);
  });
  return transactions;
}

async function postProcessTransactions(transactions) {
  // Filter out pending transactions
  transactions = transactions.filter((transaction) => transaction.status === TRANSACTION_STATUS_COMPLETED);
  transactions.sort(transactionsDateComperator);
  transactions = transactions.map((transaction) => ({
    ...transaction,
    category: categoryCalculation.getCategoryNameByTransactionDescription(transaction.description),
    hash: calculateTransactionHash(transaction),
  }));
  return transactions;
}

export function calculateTransactionHash({
  date, chargedAmount, description, memo, companyId, accountNumber,
}) {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
}

async function createTransactionsInExternalVendors(config, companyIdToTransactions, startDate) {
  await ynab.init(config);
  const outputVendorsInterfaces = [
    {
      name: 'ynab',
      createTransactionFunction: ynab.createTransactions,
      options: config.outputVendors.ynab.options,
    },
    {
      name: 'googleSheets',
      createTransactionFunction: googleSheets.createTransactionsInGoogleSheets,
      options: config.outputVendors.googleSheets.options,
    },
  ];
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  const activeVendors = outputVendorsInterfaces.filter((vendor) => _.get(config, `outputVendorsInterfaces.${vendor.name}.active`, false));
  if (!activeVendors.length) {
    throw new Error('You need to set at least one output vendor to be active');
  }

  for (let j = 0; j < activeVendors.length; j++) {
    const vendor = activeVendors[j];
    const vendorConfig = config.outputVendors[vendor.name];
    if (vendorConfig && vendorConfig.active) {
      const vendorResult = await createTransactionsInVedor(vendor, allTransactions, startDate);
      executionResult[vendor.name] = vendorResult;
    }
  }
  return executionResult;
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

export async function getFinancialAccountNumbers() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  console.log('Fetching data from financial institutions to determine the account numbers');
  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config, startDate);
  const companyIdToAccountNumbers = {};
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    companyIdToAccountNumbers[companyId] = accountNumbers;
  });
  return companyIdToAccountNumbers;
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
