import moment from 'moment';
import _ from 'lodash';
import * as configManager from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import * as bankScraper from '@/originalBudgetTrackingApp/import/bankScraper';
import { ScaperScrapingResult, Transaction } from '@/originalBudgetTrackingApp/import/bankScraper';
import * as categoryCalculation from '@/originalBudgetTrackingApp/import/categoryCalculationScript';
import { BudgetTrackingEventEmitter, EventNames } from '../eventEmitters/EventEmitter';

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;
type Config = configManager.Config;
type ScrapingConfig = Config['scraping'];

const TRANSACTION_STATUS_COMPLETED = 'completed';

export async function scrapeFinancialAccountsAndFetchTransactions(scrapingConfig: ScrapingConfig, startDate: Date, eventEmitter: BudgetTrackingEventEmitter) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};
  const accountsToScrape = scrapingConfig.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  for (let i = 0; i < accountsToScrape.length; i++) {
    const accountToScrape = accountsToScrape[i];
    const companyId = accountToScrape.key;
    try {
      await eventEmitter.emit(EventNames.IMPORTER_START, buildImporterEvent(accountToScrape));
      const scrapeResult = await fetchTransactions(accountToScrape, startDate, scrapingConfig, eventEmitter);
      const transactions = await postProcessTransactions(accountToScrape, scrapeResult);
      companyIdToTransactions[companyId] = transactions;
      await eventEmitter.emit(EventNames.IMPORTER_END, buildImporterEvent(accountToScrape));
    } catch (error) {
      await eventEmitter.emit(EventNames.IMPORTER_ERROR, buildImporterEvent(accountToScrape, { error }));
      throw error;
    }
  }
  return companyIdToTransactions;
}

function buildImporterEvent(accountConfig: AccountToScrapeConfig, additionalParams?: any) {
  return {
    id: accountConfig.id,
    name: accountConfig.name,
    companyKey: accountConfig.key,
    ...additionalParams
  };
}

export async function getFinancialAccountNumbers() {
  const eventEmitter = new BudgetTrackingEventEmitter();
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  console.log('Fetching data from financial institutions to determine the account numbers');
  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventEmitter);
  const companyIdToAccountNumbers: Record<string, string[]> = {};
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    companyIdToAccountNumbers[companyId] = accountNumbers;
  });
  return companyIdToAccountNumbers;
}

async function fetchTransactions(
  accountToScrapeConfig: AccountToScrapeConfig,
  startDate: Date, scrapingConfig: Config['scraping'],
  eventEmitter: BudgetTrackingEventEmitter
) {
  const emitImporterProgressEvent = async (message: string) => {
    await eventEmitter.emit(EventNames.IMPORTER_PROGRESS, buildImporterEvent(accountToScrapeConfig, { message }));
  };

  const scrapeResult = await bankScraper.scrape({
    companyId: accountToScrapeConfig.key,
    credentials: accountToScrapeConfig.loginFields,
    startDate,
    showBrowser: scrapingConfig.showBrowser,
  }, emitImporterProgressEvent);
  if (!scrapeResult.success) {
    throw new Error(scrapeResult.errorMessage);
  }
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

export function calculateTransactionHash({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
}
