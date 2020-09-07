import _ from 'lodash';
import moment from 'moment';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/importTransactions';
import * as bankScraper from './bankScraper';
import * as ynab from './outputVendors/ynab/ynab';
import { EnrichedTransaction } from './commonTypes';
import * as configManager from './configManager/configManager';
import outputVendors from './outputVendors';
import { Config } from './configManager/configManager';

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

async function createTransactionsInExternalVendors(config: Config, companyIdToTransactions: Record<string, EnrichedTransaction[]>, startDate: Date) {
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  for (let j = 0; j < outputVendors.length; j++) {
    const outputVendor = outputVendors[j];
    if (config.outputVendors[outputVendor.name]?.active) {
      await outputVendor.init?.(config);
      console.log(`Start creating transactions in ${outputVendor.name}`);
      const vendorResult = await outputVendor.exportTransactions(allTransactions, startDate, config);
      console.log(`Finished creating transactions in ${outputVendor.name}`);
      executionResult[outputVendor.name] = vendorResult;
    }
  }
  if (!Object.keys(executionResult).length) {
    throw new Error('You need to set at least one output vendor to be active');
  }
  return executionResult;
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
