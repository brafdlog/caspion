import moment from 'moment';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import * as bankScraper from './import/bankScraper';
import * as configManager from './configManager/configManager';
import outputVendors from './export/outputVendors';

export { printYnabAccountData } from './setupHelpers';

export { outputVendors };
export { configManager };
export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate);
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
