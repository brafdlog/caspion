import moment from 'moment';
import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import * as bankScraper from '@/originalBudgetTrackingApp/import/bankScraper';
import * as configManager from '@/originalBudgetTrackingApp/configManager/configManager';
import { ScaperScrapingResult, Transaction } from '@/originalBudgetTrackingApp/import/bankScraper';
import * as categoryCalculation from '@/originalBudgetTrackingApp/import/categoryCalculationScript';

type AccountToScrapeConfig = configManager.AccountToScrapeConfig;

const TRANSACTION_STATUS_COMPLETED = 'completed';
const DATE_FORMAT = 'DD/MM/YYYY';

export async function scrapeFinancialAccountsAndFetchTransactions(config: Config, startDate: Date) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};
  const accountsToScrape = config.scraping.accountsToScrape.filter((accountToScrape) => accountToScrape.active !== false);
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
