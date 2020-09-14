import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import { BudgetTrackingEventEmitter, EventNames } from './eventEmitters/EventEmitter';
import { buildConsoleEmitter } from './eventEmitters/consoleEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { printYnabAccountData } from './setupHelpers';
export { outputVendors };
export { configManager };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(optionalEventEmitter?: BudgetTrackingEventEmitter) {
  const eventEmitter = optionalEventEmitter || buildConsoleEmitter();
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  await eventEmitter.emit(EventNames.IMPORT_PROCESS_START, { startDate, message: `Starting to scrape from ${startDate} to today` });

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventEmitter);
  try {
    const executionResult = await createTransactionsInExternalVendors(config.outputVendors, companyIdToTransactions, startDate, eventEmitter);

    return executionResult;
  } catch (e) {
    await eventEmitter.emit(EventNames.GENERAL_ERROR, { error: e });
    throw e;
  }
}
