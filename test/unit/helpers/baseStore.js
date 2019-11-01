import sinon from 'sinon';

export default {
  modules: {
    Scrapers: {
      state: {
        scrapers: {
          scrapername1: {
            name: 'Scraper Name 1',
            loginFields: [
              'field1',
              'field2',
            ],
          },
          scrapername2: {
            name: 'Scraper Name 2',
            loginFields: [
              'field1',
              'field2',
              'field3',
            ],
          },
        },
      },
    },
    Importers: {
      importers: [],
    },
  },
  actions: {
    loadImporters: sinon.spy(),
  },
  getters: {
    scrapersWithId: sinon.spy(),
  },
};
