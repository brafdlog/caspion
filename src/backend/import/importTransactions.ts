import { EnrichedTransaction } from '@/backend/commonTypes';
import * as configManager from '@/backend/configManager/configManager';
import * as bankScraper from '@/backend/import/bankScraper';
import { ScaperScrapingResult, Transaction } from '@/backend/import/bankScraper';
import * as categoryCalculation from '@/backend/import/categoryCalculationScript';
import _ from 'lodash';
import moment from 'moment';
import {
  AccountStatus, BudgetTrackingEventEmitter, DownalodChromeEvent, EventNames, EventPublisher, ImporterEvent
} from '../eventEmitters/EventEmitter';
import { calculateTransactionHash } from '../transactions/transactions';
import getChrome from './downloadChromium';

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;
type Config = configManager.Config;
type ScrapingConfig = Config['scraping'];

const TRANSACTION_STATUS_COMPLETED = 'completed';

export async function scrapeFinancialAccountsAndFetchTransactions(
  scrapingConfig: ScrapingConfig, startDate: Date, eventPublisher: EventPublisher, chromePath?: string
) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};

  const dowloadedChrome = await getChrome(chromePath, ({ percent }) => emitChromeDownload(eventPublisher, percent));

  const accountsToScrape = scrapingConfig.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
  const scrapingPromises = accountsToScrape.map(async (accountToScrape) => {
    const companyId = accountToScrape.key;
    try {
      await eventPublisher.emit(EventNames.IMPORTER_START, buildImporterEvent(accountToScrape, { message: 'Importer start' }));
      const scrapeResult = await fetchTransactions(accountToScrape, startDate, scrapingConfig, eventPublisher, dowloadedChrome);
      const transactions = await postProcessTransactions(accountToScrape, scrapeResult);
      companyIdToTransactions[companyId] = transactions;
      await eventPublisher.emit(EventNames.IMPORTER_END, buildImporterEvent(accountToScrape, { message: 'Importer end', status: AccountStatus.DONE }));
    } catch (error) {
      await eventPublisher.emit(EventNames.IMPORTER_ERROR, buildImporterEvent(accountToScrape, {
        message: 'Importer error', error, status: AccountStatus.ERROR
      }));
      throw error;
    }
  });
  await Promise.all(scrapingPromises);
  return companyIdToTransactions;
}

function buildImporterEvent(accountConfig: AccountToScrapeConfig, additionalParams: { message: string, error?: Error, status?: AccountStatus }) {
  return new ImporterEvent({
    message: additionalParams.message,
    importerKey: accountConfig.key,
    error: additionalParams.error,
    status: additionalParams.status
  });
}

function emitChromeDownload(eventPublisher: EventPublisher, percent: number) {
  eventPublisher.emit(EventNames.DOWNLOAD_CHROME, new DownalodChromeEvent(percent));
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
  eventPublisher: EventPublisher,
  chromePath: string
) {
  const emitImporterProgressEvent = async (eventCompanyId: string, message: string) => {
    await eventPublisher.emit(EventNames.IMPORTER_PROGRESS, buildImporterEvent(accountToScrapeConfig, { message }));
  };

  const scrapeResult = await bankScraper.scrape({
    companyId: accountToScrapeConfig.key,
    credentials: accountToScrapeConfig.loginFields,
    startDate,
    showBrowser: scrapingConfig.showBrowser,
  }, emitImporterProgressEvent, chromePath);
  if (!scrapeResult.success) {
    throw new Error(scrapeResult.errorMessage || scrapeResult.errorType);
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
