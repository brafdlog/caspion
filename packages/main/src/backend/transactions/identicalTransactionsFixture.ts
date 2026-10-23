import { type EnrichedTransaction } from '@/backend/commonTypes';
import { type Transaction, TransactionStatuses, TransactionTypes } from 'israeli-bank-scrapers-core/lib/transactions';
import { calculateTransactionHash, makeHashesUnique } from './transactions';

// Test data shared by the exporters' tests: two real, separate charges on the same card and day that only differ by
// their Isracard voucher number, and an unrelated charge.
export const ACCOUNT_NUMBER = '1234';

export const booking: Transaction = {
  type: TransactionTypes.Normal,
  identifier: 51000001,
  date: '2026-09-14T21:00:00.000Z',
  processedDate: '2026-10-01T21:00:00.000Z',
  originalAmount: -2056,
  originalCurrency: 'ILS',
  chargedAmount: -2056,
  description: 'CARS ON BOOKING',
  memo: '',
  status: TransactionStatuses.Completed,
};
export const secondBooking: Transaction = { ...booking, identifier: 51000002 };
export const otherCharge: Transaction = {
  ...booking,
  identifier: 51000003,
  description: 'SWISS COM',
  chargedAmount: 40,
};

/** Enriched the way Caspion did before identical transactions got their own hash */
export const enrichBeforeUpgrade = (transaction: Transaction): EnrichedTransaction => ({
  ...transaction,
  accountNumber: ACCOUNT_NUMBER,
  hash: calculateTransactionHash(transaction, 'isracard', ACCOUNT_NUMBER),
});

/** What the importer produces from a scrape */
export const scrape = (...transactions: Transaction[]) => makeHashesUnique(transactions.map(enrichBeforeUpgrade));
