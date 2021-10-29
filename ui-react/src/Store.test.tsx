import Store from './Store';
import { dummyConfig } from './test/testData';

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
  });
});
