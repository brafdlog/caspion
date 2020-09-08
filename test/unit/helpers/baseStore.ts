export const Transactions = {
  '1541628000000-501420296066': {
    chargedAmount: -50,
    date: '2018-11-07T22:00:00.000Z',
    description: 'איקאה',
    installments: null,
    memo: '',
    originalAmount: -50,
    originalCurrency: 'ILS',
    processedDate: '2018-11-10T22:00:00.000Z',
    status: 'completed',
    type: 'normal',
  },
  '1541887200000-0.94-1236173698': {
    chargedAmount: -0.94,
    date: '2018-11-10T22:00:00.000Z',
    description: 'עיגול לטובה',
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
    Importers: {
      importers: [],
    },
    Transactions,
  },
};
