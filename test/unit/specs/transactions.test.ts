import { TransactionStatuses, TransactionTypes, Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import { calculateTransactionHash, mergeTransactions } from '../../../src/backend/transactions/transactions';

import { EnrichedTransaction } from '../../../src/backend/commonTypes';

const TRANSACTION_1 = {
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
const TRANSACTION_1_HASH = '2020-03-24T22:00:00.000Z_-54.72_Puppies__visaCal_2222';

const TRANSACTION_2 = {
  type: TransactionTypes.Normal,
  date: '2020-03-27T21:00:00.000Z',
  processedDate: '2020-04-01T21:00:00.000Z',
  originalAmount: -200,
  originalCurrency: 'ILS',
  chargedAmount: -200,
  description: "מי גבעתיים בע'מ",
  memo: 'some memo',
  installments: undefined,
  status: TransactionStatuses.Completed
};

const TRANSACTION_2_HASH = "2020-03-27T21:00:00.000Z_-200_מי גבעתיים בע'מ_some memo_visaCal_2222";

const companyId = 'visaCal';
const accountNumber = '2222';

const enrich = (trx: Transaction): EnrichedTransaction => ({
  ...trx,
  accountNumber,
  hash: calculateTransactionHash(trx, companyId, accountNumber)
});

describe('Transactions', () => {
  test.each([
    [TRANSACTION_1, TRANSACTION_1_HASH],
    [TRANSACTION_2, TRANSACTION_2_HASH],
    [{ ...TRANSACTION_1, processedDate: '2020-06-01T21:00:00.002Z' }, TRANSACTION_1_HASH],
    [{ ...TRANSACTION_1, date: '2020-03-24T22:00:00.002Z' }, TRANSACTION_1_HASH],
    [{ ...TRANSACTION_2, description: 'מי גבעתיים בע`מ' }, TRANSACTION_2_HASH],
    [{ ...TRANSACTION_2, description: "מי גבעתיים\u200E בע'מ" }, TRANSACTION_2_HASH]
  ])('Transaction hash', (transaction, expectedHash) => {
    expect(calculateTransactionHash(transaction, companyId, accountNumber)).toEqual(expectedHash);
  });

  test('Merge Transactions', () => {
    const a = [TRANSACTION_1, TRANSACTION_2].map(enrich);
    const b = [
      { ...TRANSACTION_1, processedDate: '2020-06-01T21:00:00.002Z' },
      { ...TRANSACTION_1, date: '2020-03-24T22:00:00.002Z' },
      { ...TRANSACTION_2, description: 'מי גבעתיים בע`מ' },
      { ...TRANSACTION_2, description: "מי גבעתיים\u200E בע'מ" }
    ].map(enrich);

    const actualMerged: Transaction[] = mergeTransactions(a, b);

    expect(actualMerged.length).toBe(2);
    expect(actualMerged).toMatchSnapshot();
  });
});
