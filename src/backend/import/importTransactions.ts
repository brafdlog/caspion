import { Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import Bottleneck from 'bottleneck';
import _ from 'lodash';
import moment from 'moment';
import { configFilePath, userDataPath } from '@/app-globals';
import {
  AccountToScrapeConfig,
  Config,
  EnrichedTransaction,
  FinancialAccountDetails,
  ScaperScrapingResult
} from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import * as bankScraper from '@/backend/import/bankScraper';
import * as categoryCalculation from '@/backend/import/categoryCalculationScript';
import {
  AccountStatus,
  BudgetTrackingEventEmitter,
  DownalodChromeEvent,
  EventNames,
  EventPublisher,
  ImporterEvent
} from '../eventEmitters/EventEmitter';
import { calculateTransactionHash } from '../transactions/transactions';
import getChrome from './downloadChromium';

type ScrapingConfig = Config['scraping'];

const TRANSACTION_STATUS_COMPLETED = 'completed';

export async function scrapeFinancialAccountsAndFetchTransactions(scrapingConfig: ScrapingConfig, startDate: Date, eventPublisher: EventPublisher) {
  let chromiumPath: string;

  if (scrapingConfig.chromiumPath) {
    chromiumPath = scrapingConfig.chromiumPath;
  } else {
    chromiumPath = await getChrome(userDataPath, (percent) => emitChromeDownload(eventPublisher, percent));
  }

  const limiter = new Bottleneck({
    maxConcurrent: scrapingConfig.maxConcurrency
  });
  const scrapePromises = scrapingConfig.accountsToScrape
    .filter((accountToScrape) => accountToScrape.active !== false)
    .map(async (accountToScrape) => ({
      id: accountToScrape.id,
      transactions: await limiter.schedule(() => fetchTransactions(accountToScrape, startDate, scrapingConfig.showBrowser, eventPublisher, chromiumPath))
    }));

  const promiseResults = await Promise.allSettled(scrapePromises);
  const companyIdToTransactions = promiseResults
    .reduce((idToTrxAcc, scrapeRes) => {
      if (scrapeRes.status === 'fulfilled') {
        const { id, transactions } = scrapeRes.value;
        idToTrxAcc[id] = transactions;
      }
      return idToTrxAcc;
    }, {} as Record<string, EnrichedTransaction[]>);

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

export async function getFinancialAccountDetails(): Promise<FinancialAccountDetails[]> {
  const config = await getConfig(configFilePath);
  const eventEmitter = new BudgetTrackingEventEmitter();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventEmitter);
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
  chromePath: string
) {
  try {
    await eventPublisher.emit(EventNames.IMPORTER_START, buildImporterEvent(account, { message: 'Importer start' }));

    const emitImporterProgressEvent = async (eventCompanyId: string, message: string) => {
      await eventPublisher.emit(EventNames.IMPORTER_PROGRESS, buildImporterEvent(account, { message }));
    };
    const companyId = account.key;
    const scrapeResult = await bankScraper.scrape({
      companyId,
      credentials: account.loginFields,
      startDate,
      showBrowser,
    }, emitImporterProgressEvent, chromePath);
    if (!scrapeResult.success) {
      throw new Error(`${scrapeResult.errorType}: ${scrapeResult.errorMessage}`);
    }

    const transactions = await postProcessTransactions(account, scrapeResult);
    await eventPublisher.emit(EventNames.IMPORTER_END, buildImporterEvent(account, { message: 'Importer end', status: AccountStatus.DONE }));

    return transactions;
  } catch (error) {
    await eventPublisher.emit(EventNames.IMPORTER_ERROR, buildImporterEvent(account, {
      message: error.message, error, status: AccountStatus.ERROR
    }));
    throw error;
  }
}

// eslint-disable-next-line max-len
async function postProcessTransactions(accountToScrape: AccountToScrapeConfig, scrapeResult: ScaperScrapingResult): Promise<EnrichedTransaction[]> {
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
