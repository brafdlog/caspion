import { type TransactionDetail } from 'ynab';
import { SaveTransaction } from 'ynab';
import { TransactionStatuses, TransactionTypes } from 'israeli-bank-scrapers-core/lib/transactions';
import { type EnrichedTransaction } from '@/backend/commonTypes';
import * as ynab from './ynab';
import ClearedEnum = SaveTransaction.ClearedEnum;
import { describe, expect, test } from 'vitest';

// TODO: make tests work again

describe('ynab', () => {
  describe('isSameTransaction', () => {
    test('Two transactions with different payee names should be considered the same if one of them is a transfer transaction', () => {
      const transferTransactionFromYnab: TransactionDetail = {
        id: '579ae642-d161-4bbe-9d54-ae3322c93cf7',
        date: '2019-06-27',
        amount: -1000000,
        memo: null,
        cleared: SaveTransaction.ClearedEnum.Cleared,
        approved: true,
        flag_color: null,
        account_id: 'SOME_ACCOUNT_ID',
        account_name: 'My great account',
        payee_id: 'fd7f187c-0633-434f-aaxe-1fevd68492cb',
        payee_name: 'Transfer : מזומן',
        category_id: null,
        category_name: null,
        transfer_account_id: '7859td4a-6a83-45sk-a460-1fOm0e3526f8',
        transfer_transaction_id: 'ffb523b9-ef6c-48a4-am90-23ebcf151e73',
        matched_transaction_id: null,
        import_id: null,
        deleted: false,
        subtransactions: [],
      };
      const transactionFromFinancialAccount: SaveTransaction = {
        account_id: 'SOME_ACCOUNT_ID',
        date: '2019-06-27',
        amount: -1000000,
        payee_name: 'כספומט י',
        category_id: '4e0ttc69-b4f6-420b-8d07-986c8225a3d4',
        cleared: ClearedEnum.Cleared,
      };

      expect(ynab.isSameTransaction(transactionFromFinancialAccount, transferTransactionFromYnab)).toBeTruthy();
    });
  });
  describe('areStringsEqualIgnoreCaseAndWhitespace', () => {
    test('should consider two strings with different casing as equal', async () => {
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('Gett', 'GETT')).toBeTruthy();
    });
    test('should consider two strings that are the same except for whitespace as equal', async () => {
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('Gett', 'Gett ')).toBeTruthy();
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('Gett', ' Gett ')).toBeTruthy();
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('PAYPAL *AVIDEUT        4029357733    LU', 'PAYPAL *AVIDEUT 4029357733 LU')).toBeTruthy();
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('ממלכת הצעצועים הרצליה', 'ממלכת הצעצועים  הרצליה')).toBeTruthy();
      expect(
        ynab.areStringsEqualIgnoreCaseAndWhitespace('BOOKDEPOSITORY.COM 441452307905 GB', 'BOOKDEPOSITORY.COM     441452307905  GB'),
      ).toBeTruthy();
    });
    test('should consider two different strings as not equal', async () => {
      expect(ynab.areStringsEqualIgnoreCaseAndWhitespace('Gett', ' shmett ')).toBeFalsy();
    });
  });
  describe('getPayeeName', () => {
    const transactionSample : EnrichedTransaction = {
      description: 'הוראת-קבע',
      memo: '',
      accountNumber: '',
      hash: '',
      type: TransactionTypes[TransactionTypes.Normal],
      date: '2022-01-01',
      identifier: '',
      processedDate: '',
      originalAmount: 1000,
      originalCurrency: '',
      chargedAmount: 1,
      status: TransactionStatuses[TransactionStatuses.Completed],
    };

    test.each([
      ['מסטרקרד', ''],
      [' משכורת', 'המבצע: לאומי'],
      ['קצבת ילדים', ''],
      ['בזק-הוראת קבע', 'בזק - חיובי טלפון'],
    ])('Verify getPayeeName extracts the correct payeeName', async (description, memo) => {
      transactionSample.description = description;
      transactionSample.memo = memo;
      expect(ynab.getPayeeName(transactionSample)).toBe(transactionSample.description);
    });
    test.each([
      ['הוראת קבע', 'לטובת: צהרון. עבור: צהרון גנים - ילד 00-000-0000000', 'צהרון'],
      ["העב' לאחר-נייד", 'לטובת: איש כלשהו. עבור: סוף חשבון', 'איש כלשהו'],
      ['העברה לאחר', 'לטובת: פנסיה לדוגמא. עבור: סיבה מסויימת', 'פנסיה לדוגמא'],
      ['העברה מהבנק', 'לטובת: אישה כלשהי. עבור: משכורת אוגוסט', 'אישה כלשהי'],
      // Weird bank accounts names
      ['הוראת קבע', 'לטובת: di. עבור: גן 092-.', 'di'],
    ])('Verify hapoalim transfers capture the correct payee name', async (description, memo, expected) => {
      transactionSample.description = description;
      transactionSample.memo = memo;
      expect(ynab.getPayeeName(transactionSample)).toBe(expected);
    });
  });
});
