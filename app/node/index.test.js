const { calculateTransactionHash } = require('./index');

const TRANSACTION_1 = {
  type: 'normal',
  date: '2020-03-24T22:00:00.000Z',
  processedDate: '2020-06-01T21:00:00.000Z',
  originalAmount: -14.95,
  originalCurrency: 'USD',
  chargedAmount: -54.72,
  description: 'Puppies',
  memo: '',
  installments: null,
  status: 'completed',
  companyId: 'visaCal',
  accountNumber: '2222'
};

const TRANSACTION_2 = {
  type: 'normal',
  date: '2020-03-27T21:00:00.000Z',
  processedDate: '2020-04-01T21:00:00.000Z',
  originalAmount: -200,
  originalCurrency: 'ILS',
  chargedAmount: -200,
  description: 'מי גבעתיים בעמ',
  memo: 'some memo',
  installments: null,
  status: 'completed',
  companyId: 'visaCal',
  accountNumber: '2222'
};

describe('Main flow tests', () => {
  describe('Transaction post processing', () => {
    test('Transaction hash', () => {
      expect(calculateTransactionHash(TRANSACTION_1)).toEqual('2020-03-24T22:00:00.000Z_-54.72_Puppies__visaCal_2222');
      expect(calculateTransactionHash(TRANSACTION_2)).toEqual('2020-03-27T21:00:00.000Z_-200_מי גבעתיים בעמ_some memo_visaCal_2222');
    });
  });
});
