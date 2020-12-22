import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import {
  EventPublisher, EventNames, BudgetTrackingEventEmitter, BudgetTrackingEvent
} from './eventEmitters/EventEmitter';
import { buildCompositeEventPublisher } from './eventEmitters/compositeEventPublisher';
import { buildConsoleEmitter } from './eventEmitters/consoleEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { CompanyTypes } from 'israeli-bank-scrapers-core';
export { printYnabAccountData } from './setupHelpers';
export { outputVendors };
export { configManager };
export const EventEmitter = {
  EventNames, BudgetTrackingEventEmitter
};
export { BudgetTrackingEvent };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(optionalEventPublisher?: EventPublisher) {
  const eventPublisher = createEventPublisher(optionalEventPublisher);
  const config = await configManager.getConfig();

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

function createEventPublisher<Name>(optionalEventPublisher: EventPublisher | undefined): EventPublisher {
  const eventPublishers = [buildConsoleEmitter()];
  if (optionalEventPublisher) {
    eventPublishers.push(optionalEventPublisher);
  }
  const compositeEventPublisher = buildCompositeEventPublisher(eventPublishers);
  return compositeEventPublisher;
}
