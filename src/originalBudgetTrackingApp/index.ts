import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import { EventPublisher, EventNames } from './eventEmitters/EventEmitter';
import { buildConsoleEmitter } from './eventEmitters/consoleEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { printYnabAccountData } from './setupHelpers';
export { outputVendors };
export { configManager };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(optionalEventPublisher?: EventPublisher) {
  const eventPublisher = optionalEventPublisher || buildConsoleEmitter();
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  await eventPublisher.emit(EventNames.IMPORT_PROCESS_START, { startDate, message: `Starting to scrape from ${startDate} to today` });

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventPublisher);
  try {
    const executionResult = await createTransactionsInExternalVendors(config.outputVendors, companyIdToTransactions, startDate, eventPublisher);

    return executionResult;
  } catch (e) {
    await eventPublisher.emit(EventNames.GENERAL_ERROR, { error: e });
    throw e;
  }
}
