import electron from 'electron';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { AccountStatus, BudgetTrackingEvent, CompanyTypes, type Config, OutputVendorName } from '../types';
import { configStore } from './ConfigStore';

function makeConfig(): Config {
  return {
    scraping: {
      numDaysBack: 30,
      showBrowser: false,
      timeout: 0,
      accountsToScrape: [
        {
          active: true,
          key: CompanyTypes.MAX,
          name: 'Max',
          loginFields: { username: 'user', password: 'pass' },
          id: 'max-account',
        },
      ],
    },
    outputVendors: {
      csv: { active: true, options: { filePath: 'transaction.csv' } },
    },
  } as Config;
}

describe('ConfigStore periodic scraping', () => {
  beforeEach(() => {
    vi.mocked(electron.ipcRenderer.invoke).mockClear();
    configStore.clearScrapingStatus();
    configStore.config = makeConfig();
  });

  test('IMPORT_PROCESS_START clears status and logs left over from the previous run', () => {
    configStore.handleScrapingEvent(
      'EXPORTER_END',
      new BudgetTrackingEvent({
        message: 'Finished',
        vendorId: OutputVendorName.CSV,
        accountStatus: AccountStatus.DONE,
      }),
    );
    const csvBefore = configStore.exporters.find((e) => e.companyId === OutputVendorName.CSV);
    expect(csvBefore?.status).toBe(AccountStatus.DONE);
    expect(csvBefore?.logs).toHaveLength(1);

    configStore.handleScrapingEvent('IMPORT_PROCESS_START', new BudgetTrackingEvent({ message: 'Next run' }));

    const csvAfter = configStore.exporters.find((e) => e.companyId === OutputVendorName.CSV);
    expect(csvAfter?.status).toBe(AccountStatus.IDLE);
    expect(csvAfter?.logs).toEqual([]);
  });

  test('a positive interval is stored and does not stop the timer', () => {
    configStore.setPeriodicScrapingIntervalHours(6);

    expect(configStore.config.scraping.periodicScrapingIntervalHours).toBe(6);
    expect(electron.ipcRenderer.invoke).not.toHaveBeenCalledWith('stopPeriodicScraping');
  });

  test.each([0, -1, Number.NaN, undefined])('interval %s clears the setting and stops the timer', (interval) => {
    configStore.config.scraping.periodicScrapingIntervalHours = 6;
    configStore.nextAutomaticScrapeDate = new Date('2026-01-01T12:00:00Z');

    configStore.setPeriodicScrapingIntervalHours(interval);

    expect(configStore.config.scraping.periodicScrapingIntervalHours).toBeUndefined();
    expect(configStore.nextAutomaticScrapeDate).toBeNull();
    expect(electron.ipcRenderer.invoke).toHaveBeenCalledWith('stopPeriodicScraping');
  });
});
