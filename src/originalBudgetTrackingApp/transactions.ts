import moment from 'moment';
import { Transaction } from './bankScraper';
import { getCategoryNameByTransactionDescription } from './categoryCalculationScript';
import { EnrichedTransaction } from './commonTypes';

export function enrichTransaction(transaction: Transaction, companyId: string, accountNumber: string): EnrichedTransaction {
  const hash = calculateTransactionHash(transaction, companyId, accountNumber);
  const category = getCategoryNameByTransactionDescription(transaction.description);
  const enrichedTransaction: EnrichedTransaction = {
    ...transaction,
    accountNumber,
    category,
    hash
  };
  return enrichedTransaction;
}

export function transactionsDateComparator(t1: Transaction, t2: Transaction) {
  const date1 = moment(t1.date);
  const date2 = moment(t2.date);
  if (date1.isAfter(date2)) {
    return 1;
  }
  if (date1.isBefore(date2)) {
    return -1;
  }
  return 1;
}

export function calculateTransactionHash({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
}
