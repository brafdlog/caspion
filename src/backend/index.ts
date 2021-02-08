import { createTransactionsInExternalVendors } from '@/backend/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/backend/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import {
  BudgetTrackingEvent, BudgetTrackingEventEmitter, EventNames, EventPublisher
} from './eventEmitters/EventEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { CompanyTypes } from 'israeli-bank-scrapers-core';
export { outputVendors };
export { configManager };
export { BudgetTrackingEvent, BudgetTrackingEventEmitter };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(config: configManager.Config, optionalEventPublisher?: EventPublisher) {
  const eventPublisher = optionalEventPublisher || new BudgetTrackingEventEmitter();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  await eventPublisher.emit(EventNames.IMPORT_PROCESS_START, { message: `Starting to scrape from ${startDate} to today` });

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventPublisher);
  try {
    const executionResult = await createTransactionsInExternalVendors(config.outputVendors, companyIdToTransactions, startDate, eventPublisher);

    return executionResult;
  } catch (e) {
    await eventPublisher.emit(EventNames.GENERAL_ERROR, new BudgetTrackingEvent({ message: e.message, error: e }));
    throw e;
  }
}
