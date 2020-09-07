import _ from 'lodash';
import moment from 'moment';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import * as bankScraper from './import/bankScraper';
import * as ynab from './export/outputVendors/ynab/ynab';
import * as configManager from './configManager/configManager';
import outputVendors from './export/outputVendors';

export { outputVendors };
export { configManager };
export const { inputVendors } = bankScraper;

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
