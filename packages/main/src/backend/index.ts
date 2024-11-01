import { type Config } from '@/backend/commonTypes';
import { createTransactionsInExternalVendors } from '@/backend/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/backend/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import * as Events from './eventEmitters/EventEmitter';
import outputVendors from './export/outputVendors';
import * as bankScraper from './import/bankScraper';
import logger from '../logging/logger';

export { CompanyTypes } from 'israeli-bank-scrapers-core';
export { Events, configManager, outputVendors };

export const { inputVendors } = bankScraper;

let intervalId: NodeJS.Timeout | null = null;

export async function scrapePeriodicallyIfNeeded(config: Config, optionalEventPublisher?: Events.EventPublisher) {
  const hoursInterval = config.scraping.periodicScrapingIntervalHours;
  optionalEventPublisher = optionalEventPublisher ?? new Events.BudgetTrackingEventEmitter();

  stopPeriodicScraping();

  if(hoursInterval && hoursInterval > 0) {
    await optionalEventPublisher.emit(Events.EventNames.LOG, { message: `Setting up periodic scraping every ${hoursInterval} minutes` });
    intervalId = setInterval(async () => {
      await scrapeAndUpdateOutputVendors(config, optionalEventPublisher);
    }, hoursInterval * 1000 * 60 * 60);
  }
}

export function stopPeriodicScraping() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

export async function scrapeAndUpdateOutputVendors(config: Config, optionalEventPublisher?: Events.EventPublisher) {
  const eventPublisher = optionalEventPublisher ?? new Events.BudgetTrackingEventEmitter();

  const startDate = moment().subtract(config.scraping.numDaysBack, 'days').startOf('day').toDate();

  await eventPublisher.emit(Events.EventNames.IMPORT_PROCESS_START, {
    message: `Starting to scrape from ${startDate} to today`,
  });

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(
    config.scraping,
    startDate,
    eventPublisher,
  );
  try {
    const executionResult = await createTransactionsInExternalVendors(
      config.outputVendors,
      companyIdToTransactions,
      startDate,
      eventPublisher,
    );

    return executionResult;
  } catch (e) {
    logger.error('Failed to create transactions in external vendors', e);
    await eventPublisher.emit(
      Events.EventNames.GENERAL_ERROR,
      new Events.BudgetTrackingEvent({
        message: (e as Error).message,
        error: e as Error,
      }),
    );
    throw e;
  }
}
