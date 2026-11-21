import { type ConfigStore, configStore } from './ConfigStore';
import {
  AccountStatus,
  AccountType,
  BudgetTrackingEvent,
  CompanyTypes,
  OutputVendorName,
  type Config,
  type Credentials,
  type Exporter,
  type Importer,
} from '../types';
import { beforeEach, describe, test, expect } from 'vitest';

describe('Store', () => {
  let store: ConfigStore;
  beforeEach(() => {
    store = configStore;
    store.clearScrapingStatus();
    store.config = structuredClone(dummyConfig);
  });
  describe('Properties and getters', () => {
    test('basic', () => {
      const basicStore = configStore;

      basicStore.config = dummyConfig;

      expect(basicStore.config).toMatchObject(dummyConfig);

      expect(basicStore.settings).toMatchSnapshot();
    });

    test('importers', () => {
      expect(store.importers).toHaveLength(3);

      const discountImporter = store.importers.find((importer) => importer.companyId === 'discount');
      const visaCalImporter = store.importers.find((importer) => importer.companyId === 'visaCal');
      const maxImporter = store.importers.find((importer) => importer.companyId === 'max');

      expect(discountImporter).toMatchSnapshot();
      expect(visaCalImporter).toMatchSnapshot();
      expect(maxImporter).toMatchSnapshot();
    });
    test('exporters', () => {
      expect(store.exporters).toHaveLength(4);

      expect(store.exporters).toMatchSnapshot();
    });

    test('settings', () => {
      expect(store.settings.numDaysBack).toEqual(dummyConfig.scraping.numDaysBack);
      expect(store.settings.showBrowser).toEqual(dummyConfig.scraping.showBrowser);
    });
  });
  describe('actions', () => {
    describe('importers', () => {
      test('addImporter', () => {
        const accountToAdd: Importer = {
          id: 'moshe',
          companyId: CompanyTypes.HAPOALIM,
          displayName: 'פועלים',
          loginFields: {
            username: 'david',
          },
          logo: '',
          logs: [],
          type: AccountType.IMPORTER,
          active: false,
        };
        const originalImportersLength = store.importers.length;
        store.addImporter(accountToAdd);
        expect(store.importers).toHaveLength(originalImportersLength + 1);
      });

      test('updateImporter', () => {
        const importer = store.importers[0];
        const updatedImporter = {
          ...importer,
          active: !importer.active,
        };
        store.updateImporter(importer.id, updatedImporter);
        expect(store.importers.find((importer) => importer.id === importer.id)).toHaveProperty(
          'active',
          updatedImporter.active,
        );
      });

      test('deleteImporter', () => {
        const importer = dummyConfig.scraping.accountsToScrape[0];
        const originalNumImporters = dummyConfig.scraping.accountsToScrape.length;
        expect(store.importers).toHaveLength(originalNumImporters);
        store.deleteImporter(importer.id);
        expect(store.importers).toHaveLength(originalNumImporters - 1);
      });
    });
    describe('exporters', () => {
      test('updateExporter', () => {
        const exporter: Exporter = store.exporters[0];
        const updatedExporter: Exporter = {
          ...exporter,
          options: {
            moo: 'foo',
          },
        };
        store.updateExporter(updatedExporter);
        expect(store.exporters[0]).toMatchObject(updatedExporter);
      });
    });

    describe('scraping events', () => {
      test('tracks status and logs separately for multiple importers of the same company', () => {
        store.config.scraping.accountsToScrape = [
          {
            active: true,
            key: CompanyTypes.ISRACARD,
            name: 'Isracard 1',
            loginFields: { id: '111111111', card6Digits: '111111', password: 'pass1' },
            id: 'isracard-account-1',
          },
          {
            active: false,
            key: CompanyTypes.ISRACARD,
            name: 'Isracard 2',
            loginFields: { id: '222222222', card6Digits: '222222', password: 'pass2' },
            id: 'isracard-account-2',
          },
        ];

        store.handleScrapingEvent(
          'IMPORTER_START',
          new BudgetTrackingEvent({
            message: 'Importer start',
            vendorId: CompanyTypes.ISRACARD,
            accountId: 'isracard-account-1',
            accountStatus: AccountStatus.IN_PROGRESS,
          }),
        );
        store.handleScrapingEvent(
          'IMPORTER_END',
          new BudgetTrackingEvent({
            message: 'Importer end',
            vendorId: CompanyTypes.ISRACARD,
            accountId: 'isracard-account-1',
            accountStatus: AccountStatus.DONE,
          }),
        );

        const first = store.importers.find((i) => i.id === 'isracard-account-1');
        const second = store.importers.find((i) => i.id === 'isracard-account-2');

        expect(first?.status).toBe(AccountStatus.DONE);
        expect(first?.logs.map((l) => l.message)).toEqual(['Importer start', 'Importer end']);

        expect(second?.status).toBe(AccountStatus.IDLE);
        expect(second?.logs).toEqual([]);
      });

      test('routes exporter events by vendorId when accountId is omitted', () => {
        store.handleScrapingEvent(
          'EXPORTER_END',
          new BudgetTrackingEvent({
            message: 'Finished',
            vendorId: OutputVendorName.CSV,
            accountStatus: AccountStatus.DONE,
          }),
        );

        const csvExporter = store.exporters.find((e) => e.companyId === OutputVendorName.CSV);
        expect(csvExporter?.status).toBe(AccountStatus.DONE);
        expect(csvExporter?.logs).toHaveLength(1);
      });
    });
  });
});

export const dummyConfig: Config = {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: [
      {
        active: true,
        key: CompanyTypes.DISCOUNT,
        name: 'Discount Bank',
        loginFields: {
          id: '234234134',
          password: 'notARealPass',
          num: 'LY9999',
        },
        id: 'efsvxasgd416f94d1e45a9cfc8c0a95f',
      },
      {
        active: true,
        key: CompanyTypes.VISACAL,
        name: 'Visa Cal',
        loginFields: {
          username: 'someUsername',
          password: 'somePassword',
        },
        id: '794a9ksj532d86cb4xxxb3438d0da942',
      },
      {
        active: true,
        key: CompanyTypes.MAX,
        name: 'Max',
        loginFields: {
          username: 'whatAUserName',
          password: 'greatPass',
        },
        id: '9xve2485ac202f53f85bcdb4f795dssc',
      },
    ],
    timeout: 0,
  },
  outputVendors: {
    csv: {
      active: true,
      options: {
        filePath: 'transaction.csv',
      },
    },
    json: {
      active: false,
      options: {
        filePath: 'transaction.json',
      },
    },
    ynab: {
      active: true,
      options: {
        accessToken: '################-######-####-###',
        budgetId: 'advasdvasd-asdvasdva-sdvasdvasdv-asdvasdvf',
        accountNumbersToYnabAccountIds: {
          5555: 'asdvasdvsdvs',
          1111: 'xcvxcvxcvsd',
          3333: 'xvxcdv',
          555555555: 'vsdvsdvserverv',
        },
      },
    },
    googleSheets: {
      active: false,
      options: {
        spreadsheetId: '',
        credentials: {} as Credentials,
      },
    },
  },
};
