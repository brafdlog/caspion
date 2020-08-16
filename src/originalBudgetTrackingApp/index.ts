import _ from 'lodash';
import moment from 'moment';
import * as bankScraper from './bankScraper';
import { ScaperScrapingResult, Transaction } from './bankScraper';
import * as ynab from './outputVendors/ynab/ynab';
import { EnrichedTransaction } from './commonTypes';
import * as googleSheets from './outputVendors/googleSheets/googleSheets';
import * as categoryCalculation from './categoryCalculationScript';
import * as configManager from './configManager/configManager';
import outputVendors from './outputVendors';
import { Config } from './configManager/configManager';

export { outputVendors };
export { configManager };
export const { inputVendors } = bankScraper;

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;

const TRANSACTION_STATUS_COMPLETED = 'completed';
const DATE_FORMAT = 'DD/MM/YYYY';

export const { getYnabAccountDetails } = ynab;

export async function scrapeAndUpdateOutputVendors() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.globalConfig.numDaysBack, 'days')
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

async function scrapeFinancialAccountsAndFetchTransactions(config: Config, startDate: Date) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};
  const accountsToScrape = config.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  for (let i = 0; i < accountsToScrape.length; i++) {
    const accountToScrape = accountsToScrape[i];
    const companyId = accountToScrape.key;
    try {
      console.log(`=================== Start fetching transactions for ${accountToScrape.name} ===================`);
      const scrapeResult = await fetchTransactions(companyId, accountToScrape.loginFields, startDate, config);
      const transactions = await postProcessTransactions(accountToScrape, scrapeResult);
      companyIdToTransactions[companyId] = transactions;
      console.log(`=================== Finished fetching transactions for ${accountToScrape.name} ===================`);
    } catch (e) {
      console.error(`Error fetching transactions for ${companyId}. Error: `, e);
      throw e;
    }
  }
  return companyIdToTransactions;
}

async function fetchTransactions(companyId: AccountToScrapeConfig['key'], credentials: AccountToScrapeConfig['loginFields'], startDate: Date, config: Config) {
  console.log(`Start scraping ${companyId} from date: ${moment(startDate).format(DATE_FORMAT)}`);
  const scrapeResult = await bankScraper.scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: config.globalConfig.showBrowser,
  });
  if (!scrapeResult.success) {
    console.error('Failed scraping ', companyId);
    console.error(scrapeResult.errorMessage);
    throw new Error(scrapeResult.errorMessage);
  }
  console.log('Finished scraping successfully');
  return scrapeResult;
}

// eslint-disable-next-line max-len
async function postProcessTransactions(accountToScrape: configManager.AccountToScrapeConfig, scrapeResult: ScaperScrapingResult): Promise<EnrichedTransaction[]> {
  if (scrapeResult.accounts) {
    let transactions = scrapeResult.accounts.flatMap((transactionAccount) => {
      return transactionAccount.txns.map((transaction) => enrichTransaction(transaction, accountToScrape.key, transactionAccount.accountNumber));
    });

    // Filter out pending transactions
    transactions = transactions.filter((transaction) => transaction.status === TRANSACTION_STATUS_COMPLETED);
    transactions.sort(transactionsDateComparator);
    return transactions;
  }
  return [];
}

export function calculateTransactionHash({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
}

async function createTransactionsInExternalVendors(config: Config, companyIdToTransactions: Record<string, EnrichedTransaction[]>, startDate: Date) {
  await ynab.init(config);
  const activeVendors: any = [];
  if (config.outputVendors.ynab?.active) {
    activeVendors.push({
      name: 'ynab',
      createTransactionFunction: ynab.createTransactions,
      options: config.outputVendors.ynab.options,
    });
  }
  if (config.outputVendors.googleSheets?.active) {
    activeVendors.push({
      name: 'googleSheets',
      createTransactionFunction: googleSheets.createTransactionsInGoogleSheets,
      options: config.outputVendors.googleSheets.options,
    });
  }
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

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

async function createTransactionsInVedor(vendor, transactions: EnrichedTransaction[], startDate: Date) {
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
  const companyIdToAccountNumbers: Record<string, string[]> = {};
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    companyIdToAccountNumbers[companyId] = accountNumbers;
  });
  return companyIdToAccountNumbers;
}

function enrichTransaction(transaction: Transaction, companyId: string, accountNumber: string): EnrichedTransaction {
  const hash = calculateTransactionHash(transaction, companyId, accountNumber);
  const category = categoryCalculation.getCategoryNameByTransactionDescription(transaction.description);
  const enrichedTransaction: EnrichedTransaction = {
    ...transaction,
    accountNumber,
    category,
    hash
  };
  return enrichedTransaction;
}

function transactionsDateComparator(t1: Transaction, t2: Transaction) {
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
