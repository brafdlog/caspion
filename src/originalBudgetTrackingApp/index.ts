import { createTransactionsInExternalVendors } from '@/originalBudgetTrackingApp/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import moment from 'moment';
import { ScrapingEventEmitter } from './commonTypes';
import * as configManager from './configManager/configManager';
import EmptyEventEmitterAdapter from './eventEmitters/emptyEventEmitterAdapter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';

export { printYnabAccountData } from './setupHelpers';
export { outputVendors };
export { configManager };

export const { inputVendors } = bankScraper;

export async function scrapeAndUpdateOutputVendors(optionalEventEmitter?: ScrapingEventEmitter) {
  const eventEmitter = new EmptyEventEmitterAdapter(optionalEventEmitter);
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(config.scraping.numDaysBack, 'days')
    .startOf('day')
    .toDate();

  eventEmitter.emit('status', `Starting to scrape from ${startDate} to today`);

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config.scraping, startDate, eventEmitter);
  try {
    const executionResult = await createTransactionsInExternalVendors(config.outputVendors, companyIdToTransactions, startDate, eventEmitter);

    return executionResult;
  } catch (e) {
    eventEmitter.emit('error', e.message, e);
    throw e;
  }
}
