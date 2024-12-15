import { type Config } from '@/backend/commonTypes';
import { createTransactionsInExternalVendors } from '@/backend/export/exportTransactions';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/backend/import/importTransactions';
import moment from 'moment';
import * as configManager from './configManager/configManager';
import * as Events from './eventEmitters/EventEmitter';
import { EventNames } from './eventEmitters/EventEmitter';
import outputVendors from './export/outputVendors';
import logger from '../logging/logger';

export { CompanyTypes } from 'israeli-bank-scrapers-core';
export { Events, configManager, outputVendors };

let intervalId: NodeJS.Timeout | null = null;

export async function setPeriodicScrapingIfNeeded(config: Config, optionalEventPublisher?: Events.EventPublisher) {
  const hoursInterval = config.scraping.periodicScrapingIntervalHours;
  optionalEventPublisher = optionalEventPublisher ?? new Events.BudgetTrackingEventEmitter();

  stopPeriodicScraping();

  if (hoursInterval) {
    await optionalEventPublisher.emit(EventNames.LOG, {
      message: `Setting up periodic scraping every ${hoursInterval} hours`,
    });
    intervalId = setInterval(
      async () => {
        await scrapeAndUpdateOutputVendors(config, optionalEventPublisher);
      },
      hoursInterval * 1000 * 60 * 60,
    );
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

  const nextAutomaticScrapeDate: Date | null = config.scraping.periodicScrapingIntervalHours
    ? moment().add(config.scraping.periodicScrapingIntervalHours, 'hours').toDate()
    : null;

  await eventPublisher.emit(
    EventNames.IMPORT_PROCESS_START,
    new Events.ImportStartEvent(`Starting to scrape from ${startDate} to today`, nextAutomaticScrapeDate),
  );

  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(
    config.scraping,
    startDate,
    eventPublisher,
  );
  try {
    return await createTransactionsInExternalVendors(
      config.outputVendors,
      companyIdToTransactions,
      startDate,
      eventPublisher,
    );
  } catch (e) {
    logger.error('Failed to create transactions in external vendors', e);
    await eventPublisher.emit(
      EventNames.GENERAL_ERROR,
      new Events.BudgetTrackingEvent({
        message: (e as Error).message,
        error: e as Error,
      }),
    );
    throw e;
  }
}
