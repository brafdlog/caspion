import _ from 'lodash';
import moment from 'moment';
import * as bankScraper from './bankScraper';
import { ScaperScrapingResult, Transaction } from './bankScraper';
import * as categoryCalculation from './categoryCalculationScript';
import { EnrichedTransaction, ScrapingEventEmitter } from './commonTypes';
import * as configManager from './configManager/configManager';
import { Config } from './configManager/configManager';
import EmptyEventEmitterAdapter from './eventEmitters/emptyEventEmitterAdapter';
import outputVendors from './outputVendors';
import * as googleSheets from './outputVendors/googleSheets/googleSheets';
import * as ynab from './outputVendors/ynab/ynab';

export { outputVendors };
export { configManager };
export const { inputVendors } = bankScraper;

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;

const TRANSACTION_STATUS_COMPLETED = 'completed';
const DATE_FORMAT = 'DD/MM/YYYY';

export const { getYnabAccountDetails } = ynab;

export async function scrapeAndUpdateOutputVendors(optionalEventEmitter?: ScrapingEventEmitter) {
  const eventEmitter = new EmptyEventEmitterAdapter(optionalEventEmitter);
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  eventEmitter.emit('status', `Starting to scrape from ${startDate} to today`);

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config, startDate, eventEmitter);
  try {
    const executionResult = await createTransactionsInExternalVendors(config, companyIdToTransactions, startDate, eventEmitter);
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

async function scrapeFinancialAccountsAndFetchTransactions(config: Config, startDate: Date, eventEmitter: ScrapingEventEmitter) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};
  const accountsToScrape = config.scraping.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  for (let i = 0; i < accountsToScrape.length; i++) {
    const accountToScrape = accountsToScrape[i];
    const companyId = accountToScrape.key;
    try {
      eventEmitter.emit('status', 'Start fetching transactions', { name: accountToScrape.name, date: moment(startDate).format(DATE_FORMAT) });
      const scrapeResult = await fetchTransactions(companyId, accountToScrape.loginFields, startDate, config, eventEmitter);
      const transactions = await postProcessTransactions(accountToScrape, scrapeResult);
      companyIdToTransactions[companyId] = transactions;
      eventEmitter.emit('finish', { companyId, accountId: accountToScrape.id });
    } catch (error) {
      eventEmitter.emit('error', error.message, { companyId, error });
      throw error;
    }
  }
  return companyIdToTransactions;
}

async function fetchTransactions(
  companyId: AccountToScrapeConfig['key'],
  credentials: AccountToScrapeConfig['loginFields'],
  startDate: Date,
  config: Config,
  eventEmitter: ScrapingEventEmitter
) {
  console.log(`Start scraping ${companyId} from date: ${moment(startDate).format(DATE_FORMAT)}`);
  const scrapeResult = await bankScraper.scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: config.scraping.showBrowser,
  });
  if (!scrapeResult.success) {
    eventEmitter.emit('error', scrapeResult.errorMessage || 'Failed scraping', { companyId });
    throw new Error(scrapeResult.errorMessage);
  }
  eventEmitter.emit('finish', { companyId });
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

async function createTransactionsInExternalVendors(
  config: Config, companyIdToTransactions: Record<string, EnrichedTransaction[]>, startDate: Date, eventEmitter: ScrapingEventEmitter
) {
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
    const error = new Error('You need to set at least one output vendor to be active');
    eventEmitter.emit('error', error.message, { error });
    throw error;
  }

  for (let j = 0; j < activeVendors.length; j++) {
    const vendor = activeVendors[j];
    const vendorConfig = config.outputVendors[vendor.name];
    if (vendorConfig && vendorConfig.active) {
      const vendorResult = await createTransactionsInVedor(vendor, allTransactions, startDate, eventEmitter);
      executionResult[vendor.name] = vendorResult;
    }
  }
  return executionResult;
}

async function createTransactionsInVedor(vendor, transactions: EnrichedTransaction[], startDate: Date, eventEmitter: ScrapingEventEmitter) {
  eventEmitter.emit('status', 'Start creating transactions', { name: vendor.name });
  const vendorResult = await vendor.createTransactionFunction(transactions, startDate, vendor.options);
  if (vendorResult) {
    eventEmitter.emit('status', 'results', { name: vendor.name });
  }
  eventEmitter.emit('finish', { name: vendor.name });
  return vendorResult;
}

export async function getFinancialAccountNumbers(optionalEventEmitter?: ScrapingEventEmitter) {
  const eventEmitter = new EmptyEventEmitterAdapter(optionalEventEmitter);
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  console.log('Fetching data from financial institutions to determine the account numbers');
  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config, startDate, eventEmitter);
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
