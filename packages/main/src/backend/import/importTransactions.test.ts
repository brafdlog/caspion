import { type AccountToScrapeConfig, type Config } from '@/backend/commonTypes';
import { EventNames, type EventPublisher, type ImporterEvent } from '@/backend/eventEmitters/EventEmitter';
import { CompanyTypes } from 'israeli-bank-scrapers-core';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/app-globals', () => ({
  configFilePath: '/mock/config.encrypt',
  userDataPath: '/mock/userData',
  defaultCsvPath: '/mock/transactions.csv',
  defaultJsonPath: '/mock/transactions.json',
}));

vi.mock('@/backend/import/bankScraper', () => ({
  scrape: vi.fn(),
}));

vi.mock('@/backend/import/downloadChromium', () => ({
  default: vi.fn().mockResolvedValue('/mock/chromium'),
}));

import * as bankScraper from '@/backend/import/bankScraper';
import { scrapeFinancialAccountsAndFetchTransactions } from './importTransactions';

function makeAccount(id: string, key: CompanyTypes, active = true): AccountToScrapeConfig {
  return {
    id,
    key,
    name: `${key}-${id}`,
    loginFields: { id: '123456789', card6Digits: '123456', password: 'secret' },
    active,
  };
}

describe('scrapeFinancialAccountsAndFetchTransactions importer events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('emits per-account accountId while preserving vendorId for multiple accounts of the same company', async () => {
    vi.mocked(bankScraper.scrape).mockResolvedValue({ success: true, accounts: [] });

    const emitted: { eventName: string; data: unknown }[] = [];
    const publisher: EventPublisher = {
      emit: vi.fn(async (eventName: string, data?: unknown) => {
        emitted.push({ eventName, data });
      }) as unknown as EventPublisher['emit'],
    };

    const config: Config['scraping'] = {
      numDaysBack: 30,
      showBrowser: false,
      timeout: 60000,
      chromiumPath: '/mock/chromium',
      accountsToScrape: [makeAccount('isra-1', CompanyTypes.isracard), makeAccount('isra-2', CompanyTypes.isracard)],
    };

    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(config, new Date('2025-01-01'), publisher);
    await vi.runAllTimersAsync();
    await scrapePromise;

    const startEvents = emitted
      .filter((e) => e.eventName === EventNames.IMPORTER_START)
      .map((e) => e.data as ImporterEvent);
    expect(startEvents.map((e) => e.accountId).sort()).toEqual(['isra-1', 'isra-2']);
    expect(startEvents.every((e) => e.vendorId === CompanyTypes.isracard)).toBe(true);
  });
});
