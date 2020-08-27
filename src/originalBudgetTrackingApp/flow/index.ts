import moment from 'moment';
import { getConfig } from '../configManager/configManager';
import { createTransactionsInExternalVendors } from './output';
import { scrapeFinancialAccountsAndFetchTransactions } from './scrape';

export async function scrapeAndUpdateOutputVendors() {
  const config = await getConfig();

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
