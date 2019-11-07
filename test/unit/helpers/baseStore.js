import sinon from 'sinon';

export const Transactions = {
  '1541628000000-50-1619445266': {
    chargedAmount: -50,
    date: '2018-11-07T22:00:00.000Z',
    description: 'כולל מדבר שור',
    installments: null,
    memo: '',
    originalAmount: -50,
    originalCurrency: 'ILS',
    processedDate: '2018-11-10T22:00:00.000Z',
    status: 'completed',
    type: 'normal',
  },
  efgh: {
    chargedAmount: -0.94,
    date: '2018-11-10T22:00:00.000Z',
    description: 'עיגול לארגון פעמונים',
    installments: null,
    memo: '',
    originalAmount: 0,
    originalCurrency: 'ILS',
    processedDate: '2018-11-10T22:00:00.000Z',
    status: 'completed',
    type: 'normal',
  },
};

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
    Transactions,
  },
  getters: {
    scrapersWithId: sinon.spy(),
  },
};
