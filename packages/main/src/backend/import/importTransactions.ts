import { configFilePath, userDataPath } from '@/app-globals';
import {
  type AccountToScrapeConfig,
  type Config,
  type EnrichedTransaction,
  type FinancialAccountDetails,
  type ScraperScrapingResult,
} from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import * as bankScraper from '@/backend/import/bankScraper';
import Bottleneck from 'bottleneck';
import { type Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import _ from 'lodash';
import moment from 'moment';
// import * as categoryCalculation from '@/backend/import/categoryCalculationScript';
import {
  AccountStatus,
  BudgetTrackingEventEmitter,
  DownalodChromeEvent,
  EventNames,
  ImporterEvent,
  type EventPublisher,
} from '../eventEmitters/EventEmitter';
import { calculateTransactionHash } from '../transactions/transactions';
import getChrome from './downloadChromium';
import { createOperationLogger, type OperationLogger } from '/@/logging/operationLogger';

type ScrapingConfig = Config['scraping'];

const DEFAULT_MAX_CONCURRENCY = 3;
const TRANSACTION_STATUS_COMPLETED = 'completed';

export async function scrapeFinancialAccountsAndFetchTransactions(
  scrapingConfig: ScrapingConfig,
  startDate: Date,
  eventPublisher: EventPublisher,
  opLog?: OperationLogger,
) {
  // Create operation logger if not provided (for standalone calls)
  const log = opLog ?? createOperationLogger('scrape');
  let chromiumPath: string;

  const activeAccounts = scrapingConfig.accountsToScrape.filter((a) => a.active !== false);
  log.info('START', {
    importersCount: activeAccounts.length,
    importers: activeAccounts.map((a) => a.key).join(','),
    startDate: moment(startDate).format('YYYY-MM-DD'),
    numDaysBack: moment().diff(moment(startDate), 'days'),
    showBrowser: scrapingConfig.showBrowser,
    timeout: scrapingConfig.timeout,
    maxConcurrency: scrapingConfig.maxConcurrency ?? DEFAULT_MAX_CONCURRENCY,
  });

  if (scrapingConfig.chromiumPath) {
    log.info('CHROME_PATH_PROVIDED', { path: scrapingConfig.chromiumPath });
    chromiumPath = scrapingConfig.chromiumPath;
  } else {
    log.info('CHROME_DOWNLOAD_START');
    chromiumPath = await getChrome(userDataPath, (percent) => {
      if (percent % 25 === 0) {
        log.info('CHROME_DOWNLOAD_PROGRESS', { percent });
      }
      emitChromeDownload(eventPublisher, percent);
    });
    log.info('CHROME_DOWNLOAD_COMPLETE', { path: chromiumPath });
  }

  const limiter = new Bottleneck({
    maxConcurrent: scrapingConfig.maxConcurrency || DEFAULT_MAX_CONCURRENCY,
  });
  const scrapePromises = activeAccounts.map(async (accountToScrape) => ({
    id: accountToScrape.id,
    transactions: await limiter.schedule(() =>
      fetchTransactions(
        accountToScrape,
        startDate,
        scrapingConfig.showBrowser,
        eventPublisher,
        chromiumPath,
        scrapingConfig.timeout,
        log,
      ),
    ),
  }));

  const promiseResults = await Promise.allSettled(scrapePromises);

  let successCount = 0;
  let failedCount = 0;
  let totalTransactions = 0;

  const companyIdToTransactions = promiseResults.reduce(
    (idToTrxAcc, scrapeRes) => {
      if (scrapeRes.status === 'fulfilled') {
        const { id, transactions } = scrapeRes.value;
        idToTrxAcc[id] = transactions;
        successCount++;
        totalTransactions += transactions.length;
      } else {
        failedCount++;
      }
      return idToTrxAcc;
    },
    {} as Record<string, EnrichedTransaction[]>,
  );

  // Log summary
  const result = failedCount === 0 ? 'success' : successCount === 0 ? 'failed' : 'partial';
  log.summary(result, {
    importersAttempted: activeAccounts.length,
    importersSucceeded: successCount,
    importersFailed: failedCount,
    totalTransactions,
  });

  return companyIdToTransactions;
}

function buildImporterEvent(
  accountConfig: AccountToScrapeConfig,
  additionalParams: { message: string; error?: Error; status?: AccountStatus },
) {
  return new ImporterEvent({
    message: additionalParams.message,
    importerKey: accountConfig.key,
    error: additionalParams.error,
    status: additionalParams.status,
  });
}

function emitChromeDownload(eventPublisher: EventPublisher, percent: number) {
  console.log(`Downloading chrome ${percent}%`);
  eventPublisher.emit(EventNames.DOWNLOAD_CHROME, new DownalodChromeEvent(percent));
}

export async function getFinancialAccountDetails(): Promise<FinancialAccountDetails[]> {
  const config = await getConfig(configFilePath);
  const eventEmitter = new BudgetTrackingEventEmitter();

  const startDate = moment().subtract(30, 'days').startOf('day').toDate();

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(
    config.scraping,
    startDate,
    eventEmitter,
  );
  const financialAccountDetails: { name: string; accountNumber: string }[] = [];
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    accountNumbers.forEach((accountNumber) => financialAccountDetails.push({ name: companyId, accountNumber }));
  });
  return financialAccountDetails;
}

async function fetchTransactions(
  account: AccountToScrapeConfig,
  startDate: Date,
  showBrowser: boolean,
  eventPublisher: EventPublisher,
  chromePath: string,
  timeout: number,
  opLog: OperationLogger,
) {
  const importerStartTime = Date.now();
  opLog.info('IMPORTER_START', {
    importer: account.key,
    hasCredentials: !!account.loginFields && Object.keys(account.loginFields).length > 0,
  });

  try {
    await eventPublisher.emit(EventNames.IMPORTER_START, buildImporterEvent(account, { message: 'Importer start' }));

    const emitImporterProgressEvent = async (eventCompanyId: string, message: string) => {
      opLog.info('IMPORTER_PROGRESS', { importer: account.key, phase: message });
      await eventPublisher.emit(EventNames.IMPORTER_PROGRESS, buildImporterEvent(account, { message }));
    };
    const companyId = account.key;
    const scrapeResult = await bankScraper.scrape(
      {
        companyId,
        credentials: account.loginFields,
        startDate,
        showBrowser,
        timeout,
      },
      emitImporterProgressEvent,
      chromePath,
    );
    if (!scrapeResult.success) {
      const errorType = scrapeResult.errorType || 'UNKNOWN';
      opLog.error('IMPORTER_SCRAPE_FAILED', new Error(`${errorType}: ${scrapeResult.errorMessage}`), {
        importer: account.key,
        errorType,
      });
      throw new Error(`${scrapeResult.errorType}: ${scrapeResult.errorMessage}`);
    }

    const transactions = await postProcessTransactions(account, scrapeResult);

    // Calculate transaction date range for logging
    const txDates = transactions.map((t) => moment(t.date));
    const oldestTx = txDates.length > 0 ? moment.min(txDates).format('YYYY-MM-DD') : 'N/A';
    const newestTx = txDates.length > 0 ? moment.max(txDates).format('YYYY-MM-DD') : 'N/A';

    // Count unique accounts (sanitized - just count, not actual numbers)
    const uniqueAccountsCount = _.uniq(transactions.map((t) => t.accountNumber)).length;

    opLog.info('IMPORTER_SUCCESS', {
      importer: account.key,
      transactionsFound: transactions.length,
      accountsCount: uniqueAccountsCount,
      dateRange: `${oldestTx} to ${newestTx}`,
      duration: `${Date.now() - importerStartTime}ms`,
    });

    await eventPublisher.emit(
      EventNames.IMPORTER_END,
      buildImporterEvent(account, {
        message: 'Importer end',
        status: AccountStatus.DONE,
      }),
    );

    return transactions;
  } catch (e) {
    const error = e as Error;
    opLog.error('IMPORTER_FAILED', error, {
      importer: account.key,
      duration: `${Date.now() - importerStartTime}ms`,
    });

    await eventPublisher.emit(
      EventNames.IMPORTER_ERROR,
      buildImporterEvent(account, {
        message: error.message,
        error: error,
        status: AccountStatus.ERROR,
      }),
    );
    throw e;
  }
}

// eslint-disable-next-line max-len
async function postProcessTransactions(
  accountToScrape: AccountToScrapeConfig,
  scrapeResult: ScraperScrapingResult,
): Promise<EnrichedTransaction[]> {
  if (scrapeResult.accounts) {
    let transactions = scrapeResult.accounts.flatMap((transactionAccount) => {
      return transactionAccount.txns.map((transaction) =>
        enrichTransaction(transaction, accountToScrape.key, transactionAccount.accountNumber),
      );
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
  // const category = categoryCalculation.getCategoryNameByTransactionDescription(transaction.description);
  const enrichedTransaction: EnrichedTransaction = {
    ...transaction,
    accountNumber,
    // category,
    hash,
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
