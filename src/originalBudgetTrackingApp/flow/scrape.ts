import { createScraper, SCRAPERS } from '@brafdlog/israeli-bank-scrapers-core';
import { ScaperScrapingResult } from '@brafdlog/israeli-bank-scrapers-core/lib/scrapers/base-scraper';
import _ from 'lodash';
import moment from 'moment';
import getChrome from '../../modules/downloadChromium';
import { EnrichedTransaction } from '../commonTypes';
import { getConfig } from '../configManager/configManager';
import { AccountToScrapeConfig, Config } from '../configManager/configTypes';
import { enrichTransaction, transactionsDateComparator } from '../transactions';

export { ScaperScrapingResult } from '@brafdlog/israeli-bank-scrapers-core/lib/scrapers/base-scraper';
export { Transaction } from '@brafdlog/israeli-bank-scrapers-core/lib/transactions';

const TRANSACTION_STATUS_COMPLETED = 'completed';
const DATE_FORMAT = 'DD/MM/YYYY';

export const inputVendors = Object.keys(SCRAPERS)
  .map((key) => ({
    key,
    ...SCRAPERS[key],
  }));

interface ScrapeParameters {
  companyId: AccountToScrapeConfig['key'];
  credentials: AccountToScrapeConfig['loginFields'];
  startDate: Date;
  showBrowser?: boolean
}

async function scrape({
  companyId, credentials, startDate, showBrowser = false
}: ScrapeParameters) {
  if (!credentials || (!credentials.username && !credentials.num && !credentials.id) || !credentials.password) {
    throw new Error(`Missing credentials for scraper. CompanyId: ${companyId}`);
  }

  const chromePath = await getChrome(undefined, console.log);

  const options = {
    companyId, // mandatory; one of 'hapoalim', 'discount', 'otsarHahayal', 'leumiCard', 'isracard', 'amex'
    startDate, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    combineInstallments: false, // if set to true, all installment transactions will be combine into the first one
    showBrowser, // shows the browser while scraping, good for debugging (default false)
    verbose: false, // include more debug info about in the output
    executablePath: chromePath
  };
  const scraper = createScraper(options);
  const scrapeResult = await scraper.scrape(credentials);

  if (!scrapeResult.success) {
    console.error(`scraping failed for the following reason: ${scrapeResult.errorType}`);
  }
  return scrapeResult;
}

export async function getFinancialAccountNumbers() {
  const config = await getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  console.log('Fetching data from financial institutions to determine the account numbers');
  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate);
  const companyIdToAccountNumbers: Record<string, string[]> = {};
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    companyIdToAccountNumbers[companyId] = accountNumbers;
  });
  return companyIdToAccountNumbers;
}

export async function scrapeFinancialAccountsAndFetchTransactions(scrapingConfig: Config['scraping'], startDate: Date) {
  const companyIdToTransactions: Record<string, EnrichedTransaction[]> = {};

  const enabledSccounts = scrapingConfig.accountsToScrape.filter((account) => account.active);
  for (let i = 0; i < enabledSccounts.length; i++) {
    const accountToScrape = enabledSccounts[i];
    const companyId = accountToScrape.key;
    try {
      console.log(`=================== Start fetching transactions for ${accountToScrape.name} ===================`);
      const scrapeResult = await fetchTransactions(companyId, accountToScrape.loginFields, startDate, scrapingConfig);
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

// eslint-disable-next-line max-len
async function fetchTransactions(companyId: AccountToScrapeConfig['key'], credentials: AccountToScrapeConfig['loginFields'], startDate: Date, config: Config['scraping']) {
  console.log(`Start scraping ${companyId} from date: ${moment(startDate).format(DATE_FORMAT)}`);
  const scrapeResult = await scrape({
    companyId,
    credentials,
    startDate,
    showBrowser: config.showBrowser,
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
