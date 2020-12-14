import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import * as configManager from '@/originalBudgetTrackingApp/configManager/configManager';
import * as bankScraper from '@/originalBudgetTrackingApp/import/bankScraper';
import { ScaperScrapingResult, Transaction } from '@/originalBudgetTrackingApp/import/bankScraper';
import * as categoryCalculation from '@/originalBudgetTrackingApp/import/categoryCalculationScript';
import _ from 'lodash';
import moment from 'moment';
import {
  BudgetTrackingEventEmitter, EventNames, EventPublisher, ImporterEvent
} from '../eventEmitters/EventEmitter';
import { calculateTransactionHash } from '../transactions/transactions';

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;
type Config = configManager.Config;
type ScrapingConfig = Config['scraping'];

const TRANSACTION_STATUS_COMPLETED = 'completed';

export async function scrapeFinancialAccountsAndFetchTransactions(scrapingConfig: ScrapingConfig, startDate: Date, eventPublisher: EventPublisher) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};
  const accountsToScrape = scrapingConfig.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  for (let i = 0; i < accountsToScrape.length; i++) {
    const accountToScrape = accountsToScrape[i];
    const companyId = accountToScrape.key;
    try {
      await eventPublisher.emit(EventNames.IMPORTER_START, buildImporterEvent(accountToScrape, { message: 'Importer start' }));
      const scrapeResult = await fetchTransactions(accountToScrape, startDate, scrapingConfig, eventPublisher);
      const transactions = await postProcessTransactions(accountToScrape, scrapeResult);
      companyIdToTransactions[companyId] = transactions;
      await eventPublisher.emit(EventNames.IMPORTER_END, buildImporterEvent(accountToScrape, { message: 'Importer end' }));
    } catch (error) {
      await eventPublisher.emit(EventNames.IMPORTER_ERROR, buildImporterEvent(accountToScrape, { message: 'Importer error', error }));
      throw error;
    }
  }
  return companyIdToTransactions;
}

function buildImporterEvent(accountConfig: AccountToScrapeConfig, additionalParams: { message: string, error?: Error }) {
  return new ImporterEvent({
    message: additionalParams.message,
    importerName: accountConfig.name,
    importerKey: accountConfig.key,
    error: additionalParams.error
  });
}

export async function getFinancialAccountNumbers() {
  const eventEmitter = new BudgetTrackingEventEmitter();
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

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
  eventPublisher: EventPublisher
) {
  const emitImporterProgressEvent = async (eventCompanyId: string, message: string) => {
    await eventPublisher.emit(EventNames.IMPORTER_PROGRESS, buildImporterEvent(accountToScrapeConfig, { message }));
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
