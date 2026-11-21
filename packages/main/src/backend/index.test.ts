import { type Config } from '@/backend/commonTypes';
import { type EventPublisher } from '@/backend/eventEmitters/EventEmitter';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/app-globals', () => ({
  configFilePath: '/mock/config.encrypt',
  userDataPath: '/mock/userData',
  defaultCsvPath: '/mock/transactions.csv',
  defaultJsonPath: '/mock/transactions.json',
}));

vi.mock('@/backend/import/importTransactions', () => ({
  scrapeFinancialAccountsAndFetchTransactions: vi.fn().mockResolvedValue({}),
}));

vi.mock('@/backend/export/exportTransactions', () => ({
  createTransactionsInExternalVendors: vi.fn().mockResolvedValue({}),
}));

vi.mock('@/backend/proxyConfig', () => ({
  initProxyIfNeeded: vi.fn().mockResolvedValue(undefined),
  tearDownProxy: vi.fn(),
}));

import { scrapeFinancialAccountsAndFetchTransactions } from '@/backend/import/importTransactions';
import { setPeriodicScrapingIfNeeded, stopPeriodicScraping } from './index';

function makeConfig(overrides: Partial<Config['scraping']> = {}): Config {
  return {
    scraping: {
      numDaysBack: 30,
      showBrowser: false,
      timeout: 60000,
      accountsToScrape: [],
      periodicScrapingIntervalHours: 1,
      ...overrides,
    },
    outputVendors: {},
  };
}

const noopEventPublisher: EventPublisher = {
  emit: vi.fn().mockResolvedValue(undefined),
};

describe('setPeriodicScrapingIfNeeded', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    stopPeriodicScraping();
  });

  afterEach(() => {
    stopPeriodicScraping();
    vi.useRealTimers();
  });

  test('reloads fresh config on each periodic tick instead of using stale config', async () => {
    const initialConfig = makeConfig({ numDaysBack: 30, periodicScrapingIntervalHours: 1 });
    const updatedConfig = makeConfig({ numDaysBack: 7, periodicScrapingIntervalHours: 1 });
    const loadConfig = vi.fn().mockResolvedValue(updatedConfig);

    await setPeriodicScrapingIfNeeded(initialConfig, noopEventPublisher, loadConfig);

    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(scrapeFinancialAccountsAndFetchTransactions).toHaveBeenCalledTimes(1);
    const [calledScrapingConfig] = vi.mocked(scrapeFinancialAccountsAndFetchTransactions).mock.calls[0];
    expect(calledScrapingConfig.numDaysBack).toBe(7);
  });

  test('stops periodic scraping and skips run when interval is disabled in fresh config', async () => {
    const initialConfig = makeConfig({ periodicScrapingIntervalHours: 1 });
    const disabledConfig = makeConfig({ periodicScrapingIntervalHours: undefined });
    const loadConfig = vi.fn().mockResolvedValue(disabledConfig);

    await setPeriodicScrapingIfNeeded(initialConfig, noopEventPublisher, loadConfig);

    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(scrapeFinancialAccountsAndFetchTransactions).not.toHaveBeenCalled();

    // Timer was stopped, so advancing another hour should not reload config again
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(loadConfig).toHaveBeenCalledTimes(1);
  });

  test('skips a periodic tick if a scrape is already in progress', async () => {
    let resolveScrape!: () => void;
    vi.mocked(scrapeFinancialAccountsAndFetchTransactions).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveScrape = () => resolve({});
        }),
    );

    const config = makeConfig({ periodicScrapingIntervalHours: 1 });
    const loadConfig = vi.fn().mockResolvedValue(config);

    await setPeriodicScrapingIfNeeded(config, noopEventPublisher, loadConfig);

    // Tick 1 starts a long-running scrape
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(scrapeFinancialAccountsAndFetchTransactions).toHaveBeenCalledTimes(1);

    // Tick 2 fires while tick 1 is still running -> skipped
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(scrapeFinancialAccountsAndFetchTransactions).toHaveBeenCalledTimes(1);

    // Finish tick 1, then tick 3 runs normally
    resolveScrape();
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(scrapeFinancialAccountsAndFetchTransactions).toHaveBeenCalledTimes(2);
  });

  test('stopPeriodicScraping cancels future runs', async () => {
    const config = makeConfig({ periodicScrapingIntervalHours: 1 });
    const loadConfig = vi.fn().mockResolvedValue(config);

    await setPeriodicScrapingIfNeeded(config, noopEventPublisher, loadConfig);
    stopPeriodicScraping();

    await vi.advanceTimersByTimeAsync(2 * 60 * 60 * 1000);
    expect(loadConfig).not.toHaveBeenCalled();
    expect(scrapeFinancialAccountsAndFetchTransactions).not.toHaveBeenCalled();
  });
});
