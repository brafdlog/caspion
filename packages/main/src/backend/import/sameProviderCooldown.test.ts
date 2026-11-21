import { type AccountToScrapeConfig, type Config } from '@/backend/commonTypes';
import {
  AccountStatus,
  EventNames,
  type EventPublisher,
  type ImporterEvent,
} from '@/backend/eventEmitters/EventEmitter';
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
import { getProviderGroup, scrapeFinancialAccountsAndFetchTransactions } from './importTransactions';

function makeAccount(id: string, key: CompanyTypes, active = true): AccountToScrapeConfig {
  return {
    id,
    key,
    name: `${key}-${id}`,
    loginFields: { id: '123456789', card6Digits: '123456', password: 'secret' },
    active,
  };
}

function makeScrapingConfig(
  accountsToScrape: AccountToScrapeConfig[],
  overrides: Partial<Config['scraping']> = {},
): Config['scraping'] {
  return {
    numDaysBack: 30,
    showBrowser: false,
    timeout: 60000,
    chromiumPath: '/mock/chromium',
    maxConcurrency: 3,
    sameProviderDelaySeconds: 15,
    accountsToScrape,
    ...overrides,
  };
}

function makeEventPublisher() {
  const emitted: { eventName: string; data: unknown }[] = [];
  const publisher: EventPublisher = {
    emit: vi.fn(async (eventName: string, data?: unknown) => {
      emitted.push({ eventName, data });
    }) as unknown as EventPublisher['emit'],
  };
  return { publisher, emitted };
}

describe('getProviderGroup', () => {
  test('groups isracard and amex together under the same provider group', () => {
    expect(getProviderGroup(CompanyTypes.isracard)).toBe(getProviderGroup(CompanyTypes.amex));
  });

  test('keeps unrelated providers in distinct groups', () => {
    expect(getProviderGroup(CompanyTypes.hapoalim)).not.toBe(getProviderGroup(CompanyTypes.max));
    expect(getProviderGroup(CompanyTypes.isracard)).not.toBe(getProviderGroup(CompanyTypes.visaCal));
  });
});

describe('scrapeFinancialAccountsAndFetchTransactions same-provider cooldown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('serializes two isracard accounts with a post-completion cooldown even when maxConcurrency > 1', async () => {
    const timeline: { id: string; event: 'start' | 'end'; at: number }[] = [];
    let callIdx = 0;

    vi.mocked(bankScraper.scrape).mockImplementation(async () => {
      const idx = ++callIdx;
      const id = `call-${idx}`;
      timeline.push({ id, event: 'start', at: Date.now() });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      timeline.push({ id, event: 'end', at: Date.now() });
      return { success: true, accounts: [] };
    });

    const accounts = [makeAccount('isra-1', CompanyTypes.isracard), makeAccount('isra-2', CompanyTypes.isracard)];
    const { publisher, emitted } = makeEventPublisher();

    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(
      makeScrapingConfig(accounts, { maxConcurrency: 3, sameProviderDelaySeconds: 10 }),
      new Date('2025-01-01'),
      publisher,
    );

    await vi.runAllTimersAsync();
    const result = await scrapePromise;

    expect(Object.keys(result)).toEqual(['isra-1', 'isra-2']);
    expect(timeline).toHaveLength(4);
    // First finishes at t=1000, cooldown is 10000ms, so second must start at >= t=11000
    expect(timeline[0]).toMatchObject({ id: 'call-1', event: 'start' });
    expect(timeline[1]).toMatchObject({ id: 'call-1', event: 'end' });
    expect(timeline[2]).toMatchObject({ id: 'call-2', event: 'start' });
    expect(timeline[2].at - timeline[1].at).toBeGreaterThanOrEqual(10_000);

    // Cooldown progress message emitted for second account
    const cooldownEvents = emitted.filter(
      (e) => e.eventName === EventNames.IMPORTER_PROGRESS && (e.data as ImporterEvent).message.includes('10s'),
    );
    expect(cooldownEvents).toHaveLength(1);
  });

  test('serializes isracard and amex with cooldown because they share a backend', async () => {
    const timeline: { companyId: string; event: 'start' | 'end'; at: number }[] = [];

    vi.mocked(bankScraper.scrape).mockImplementation(async ({ companyId }) => {
      timeline.push({ companyId, event: 'start', at: Date.now() });
      await new Promise((resolve) => setTimeout(resolve, 500));
      timeline.push({ companyId, event: 'end', at: Date.now() });
      return { success: true, accounts: [] };
    });

    const accounts = [makeAccount('isra-1', CompanyTypes.isracard), makeAccount('amex-1', CompanyTypes.amex)];
    const { publisher } = makeEventPublisher();

    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(
      makeScrapingConfig(accounts, { maxConcurrency: 3, sameProviderDelaySeconds: 5 }),
      new Date('2025-01-01'),
      publisher,
    );

    await vi.runAllTimersAsync();
    await scrapePromise;

    expect(timeline[0]).toMatchObject({ companyId: CompanyTypes.isracard, event: 'start' });
    expect(timeline[1]).toMatchObject({ companyId: CompanyTypes.isracard, event: 'end' });
    expect(timeline[2]).toMatchObject({ companyId: CompanyTypes.amex, event: 'start' });
    expect(timeline[2].at - timeline[1].at).toBeGreaterThanOrEqual(5_000);
  });

  test('runs different providers in parallel without waiting for same-provider cooldown', async () => {
    const startedAt: Record<string, number> = {};

    vi.mocked(bankScraper.scrape).mockImplementation(async ({ companyId }) => {
      startedAt[companyId] = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, accounts: [] };
    });

    const accounts = [
      makeAccount('isra-1', CompanyTypes.isracard),
      makeAccount('hapoalim-1', CompanyTypes.hapoalim),
      makeAccount('max-1', CompanyTypes.max),
    ];
    const { publisher } = makeEventPublisher();

    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(
      makeScrapingConfig(accounts, { maxConcurrency: 3, sameProviderDelaySeconds: 30 }),
      new Date('2025-01-01'),
      publisher,
    );

    await vi.runAllTimersAsync();
    await scrapePromise;

    // All three different providers start immediately at t=0
    expect(startedAt[CompanyTypes.isracard]).toBe(startedAt[CompanyTypes.hapoalim]);
    expect(startedAt[CompanyTypes.hapoalim]).toBe(startedAt[CompanyTypes.max]);
  });

  test('still runs second account after cooldown when first account of same provider fails', async () => {
    let call = 0;
    const timestamps: number[] = [];

    vi.mocked(bankScraper.scrape).mockImplementation(async () => {
      call++;
      timestamps.push(Date.now());
      if (call === 1) {
        return { success: false, errorType: 'GENERIC' as never, errorMessage: '429 blocked' };
      }
      return { success: true, accounts: [] };
    });

    const accounts = [makeAccount('isra-1', CompanyTypes.isracard), makeAccount('isra-2', CompanyTypes.isracard)];
    const { publisher, emitted } = makeEventPublisher();

    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(
      makeScrapingConfig(accounts, { sameProviderDelaySeconds: 12 }),
      new Date('2025-01-01'),
      publisher,
    );

    await vi.runAllTimersAsync();
    const result = await scrapePromise;

    expect(timestamps).toHaveLength(2);
    expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(12_000);
    expect(result).not.toHaveProperty('isra-1');
    expect(result).toHaveProperty('isra-2');

    const errorEvent = emitted.find((e) => e.eventName === EventNames.IMPORTER_ERROR)?.data as ImporterEvent;
    expect(errorEvent.accountStatus).toBe(AccountStatus.ERROR);

    const endEvent = emitted.find((e) => e.eventName === EventNames.IMPORTER_END)?.data as ImporterEvent;
    expect(endEvent.accountStatus).toBe(AccountStatus.DONE);
  });

  test('skips inactive accounts and does not wait cooldown when only one account is active', async () => {
    vi.mocked(bankScraper.scrape).mockResolvedValue({ success: true, accounts: [] });

    const accounts = [
      makeAccount('isra-1', CompanyTypes.isracard, true),
      makeAccount('isra-2', CompanyTypes.isracard, false),
    ];
    const { publisher } = makeEventPublisher();

    const startTime = Date.now();
    const scrapePromise = scrapeFinancialAccountsAndFetchTransactions(
      makeScrapingConfig(accounts, { sameProviderDelaySeconds: 30 }),
      new Date('2025-01-01'),
      publisher,
    );

    await vi.runAllTimersAsync();
    const result = await scrapePromise;

    expect(bankScraper.scrape).toHaveBeenCalledTimes(1);
    expect(Object.keys(result)).toEqual(['isra-1']);
    expect(Date.now() - startTime).toBeLessThan(30_000);
  });
});
