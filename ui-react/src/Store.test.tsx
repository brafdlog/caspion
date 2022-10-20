import Store from './Store';
import { dummyConfig } from './test/testData';
import { AccountType, CompanyTypes, Exporter, Importer } from "./types";

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
      describe('importers', () => {
          test('addImporter', () => {
              const accountToAdd: Importer = {
                  id: 'moshe',
                  companyId: CompanyTypes.hapoalim,
                  displayName: 'פועלים',
                  loginFields: {
                      username: 'david'
                  },
                  logo: "",
                  logs: [],
                  type: AccountType.IMPORTER,
                  active: false
              };
              expect(store.allAccountsById.get(accountToAdd.id)).toBeFalsy();
              const originalImportersLength = store.importers.length;
              store.addImporter(accountToAdd);
              expect(store.importers).toHaveLength(originalImportersLength + 1);
              expect(store.allAccountsById.get(accountToAdd.id)).toMatchSnapshot();
          });

          test('updateImporter', () => {
              const importer = store.importers[0];
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
      describe('exporters', () => {
         test('updateExporter', () => {
             const exporter: Exporter = store.exporters[0];
             const updatedExporter: Exporter = {
                 ...exporter,
                 options: {
                     moo: 'foo'
                 }
             };
             store.updateExporter(updatedExporter);
             expect(store.exporters[0]).toMatchObject(updatedExporter);
         });
      });
  });
});
