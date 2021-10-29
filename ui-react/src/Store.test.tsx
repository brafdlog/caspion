import Store from './Store';
import { dummyConfig } from './test/testData';
import { AccountToScrapeConfig, CompanyTypes } from "./types";

describe('Store', () => {
 let store;
 beforeEach(() => {
  store = new Store();
  store.configuration = dummyConfig;
 });
  describe('Properties and getters', () => {
    test('basic', () => {
      const store = new Store();
      expect(store.config).not.toBeDefined();

      store.configuration = dummyConfig;

      expect(store.config).toMatchObject(dummyConfig);

      expect(store.settings).toMatchSnapshot();
    });

    test('importers', () => {
      expect(store.importers).toHaveLength(3);

      const discountImporter = store.importers.find(i => i.companyId === 'discount');
      const visaCalImporter = store.importers.find(i => i.companyId === 'visaCal');
      const maxImporter = store.importers.find(i => i.companyId === 'max');

      expect(discountImporter).toMatchSnapshot();
      expect(visaCalImporter).toMatchSnapshot();
      expect(maxImporter).toMatchSnapshot();
    });
    test('exporters', () => {
     expect(store.exporters).toHaveLength(4);

     expect(store.exporters).toMatchSnapshot();
    });

    test('allAccounts', () => {
        expect(store.allAccounts).toHaveLength(store.importers.length + store.exporters.length);
        [...store.importers, ...store.exporters].forEach(account => expect(store.allAccounts).toContainEqual(account));
    });

    test('settings', () => {
       expect(store.settings.numDaysBack).toEqual(dummyConfig.scraping.numDaysBack);
       expect(store.settings.showBrowser).toEqual(dummyConfig.scraping.showBrowser);
    });
  });
  describe('actions', () => {
     test('addImporter', () => {
        const accountToAdd: AccountToScrapeConfig = {
            id: 'moshe',
            key: CompanyTypes.discount,
            name: 'Poalim',
            loginFields: {
                username: 'david'
            },
            active: false
        };
        expect(store.allAccountsById.get(accountToAdd.id)).toBeFalsy();
        store.addImporter(accountToAdd);
        expect(store.allAccountsById.get(accountToAdd.id)).toMatchSnapshot();
     });

     test('updateImporter', () => {
         const importer = dummyConfig.scraping.accountsToScrape[0];
         const updatedImporter = {
             ...importer,
             active: !importer.active
         };
         store.updateImporter(importer.id, updatedImporter);
         expect(store.importers.find(i => i.id === importer.id)).toHaveProperty('active', updatedImporter.active);
     });

     test('deleteImporter', () => {
         const importer = dummyConfig.scraping.accountsToScrape[0];
         let originalNumImporters = dummyConfig.scraping.accountsToScrape.length;
         expect(store.importers).toHaveLength(originalNumImporters);
         expect(store.allAccountsById.get(importer.id)).toBeTruthy();
         store.deleteImporter(importer.id);
         expect(store.importers).toHaveLength(originalNumImporters - 1);
         expect(store.allAccountsById.get(importer.id)).toBeFalsy();
     });
  });
});
