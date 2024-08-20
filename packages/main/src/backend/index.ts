import moment from 'moment';
import { createTransactionsInExternalVendors } from '@/backend/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/backend/import/importTransactions';
import { type Config } from '@/backend/commonTypes';
import * as configManager from './configManager/configManager';
import * as Events from './eventEmitters/EventEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { CompanyTypes } from 'israeli-bank-scrapers-core';
export { outputVendors };
export { configManager };
export { Events };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(config: Config, optionalEventPublisher?: Events.EventPublisher) {
  const eventPublisher = optionalEventPublisher ?? new Events.BudgetTrackingEventEmitter();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  await eventPublisher.emit(Events.EventNames.IMPORT_PROCESS_START, { message: `Starting to scrape from ${startDate} to today` });

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventPublisher);
  try {
    const executionResult = await createTransactionsInExternalVendors(config.outputVendors, companyIdToTransactions, startDate, eventPublisher);

    return executionResult;
  } catch (e) {
    await eventPublisher.emit(Events.EventNames.GENERAL_ERROR, new Events.BudgetTrackingEvent({ message: (e as Error).message, error: e as Error }));
    throw e;
  }
}
