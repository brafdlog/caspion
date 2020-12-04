import { TransactionStatuses, TransactionTypes } from 'israeli-bank-scrapers-core/lib/transactions';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import { serializeTransactions, parseTransactions } from '@/originalBudgetTrackingApp/export/outputVendors/csv/csv';


const transactions: EnrichedTransaction[] = [
  {
    identifier: 3982580,
    chargedAmount: 78,
    date: '2018-11-07T22:00:00.000Z',
    description: 'Ikea',
    installments: { number: 2, total: 7 },
    memo: 'hello',
    originalAmount: -50,
    originalCurrency: 'ILS',
    processedDate: '2018-11-10T22:00:00.000Z',
    accountNumber: 'abcd',
    category: 'Misc',
    hash: '111',
    status: TransactionStatuses.Completed,
    type: TransactionTypes.Normal
  },
  {
    identifier: undefined,
    chargedAmount: 1000,
    date: '2018-11-07T22:00:00.000Z',
    description: 'Samuel',
    installments: undefined,
    memo: 'amazing memo',
    originalAmount: 932,
    originalCurrency: 'ILS',
    processedDate: '2018-11-10T22:00:00.000Z',
    accountNumber: '8375982KJHDS2',
    category: 'Finance',
    hash: '11KJFLDKJ22__3231',
    status: TransactionStatuses.Pending,
    type: TransactionTypes.Installments
  }
];


describe('CSV exporter', () => {
  describe('Serialize and parse transactions', () => {
    test('Basic test case', () => {
      const serialized = serializeTransactions(transactions);
      expect(serialized).toMatchSnapshot();
      const parsed = parseTransactions(serialized);
      expect(parsed).toMatchSnapshot();
    });
    test('should convert undefined string to empty string', () => {
      transactions[1].memo = undefined;
      const serialized = serializeTransactions(transactions);
      const parsed = parseTransactions(serialized);
      expect(parsed[1].memo).toEqual('');
    });
  });
});
