import { TransactionStatuses, TransactionTypes } from 'israeli-bank-scrapers-core/lib/transactions';
import { calculateTransactionHash } from '@/originalBudgetTrackingApp/transactions/transactions';
import { Transaction } from './bankScraper';

const TRANSACTION_1: Transaction = {
  type: TransactionTypes.Normal,
  date: '2020-03-24T22:00:00.000Z',
  processedDate: '2020-06-01T21:00:00.000Z',
  originalAmount: -14.95,
  originalCurrency: 'USD',
  chargedAmount: -54.72,
  description: 'Puppies',
  memo: '',
  installments: undefined,
  status: TransactionStatuses.Completed
};

const TRANSACTION_2: Transaction = {
  type: TransactionTypes.Normal,
  date: '2020-03-27T21:00:00.000Z',
  processedDate: '2020-04-01T21:00:00.000Z',
  originalAmount: -200,
  originalCurrency: 'ILS',
  chargedAmount: -200,
  description: 'מי גבעתיים בעמ',
  memo: 'some memo',
  installments: undefined,
  status: TransactionStatuses.Completed
};

describe('Main flow tests', () => {
  describe('Transaction post processing', () => {
    test('Transaction hash', () => {
      const companyId = 'visaCal';
      const accountNumber = '2222';
      expect(calculateTransactionHash(TRANSACTION_1, companyId, accountNumber)).toEqual('2020-03-24T22:00:00.000Z_-54.72_Puppies__visaCal_2222');
      expect(calculateTransactionHash(TRANSACTION_2, companyId, accountNumber)).toEqual('2020-03-27T21:00:00.000Z_-200_מי גבעתיים בעמ_some memo_visaCal_2222');
    });
  });
});
