import { uniq } from 'lodash';
import { EnrichedTransaction } from '../commonTypes';
import { Transaction } from '../import/bankScraper';
import { compareObjectsByDate } from './dates';

const transactionArrayToObject = (transactions: EnrichedTransaction[]) => transactions.reduce((acc, enrichedTransaction) => {
  acc[enrichedTransaction.hash] = enrichedTransaction;
  return acc;
}, {} as Record<string, EnrichedTransaction>);

export const calculateTransactionHash = ({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) => {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
};

export const mergeTransactions = (a: EnrichedTransaction[], b: EnrichedTransaction[]) => {
  const aObj = transactionArrayToObject(a);
  const bObj = transactionArrayToObject(b);
  const hashes = uniq(Object.keys(aObj).concat(...Object.keys(bObj)));

  const mergedObj = hashes.reduce((merged, hash) => {
    merged[hash] = { ...aObj[hash], ...bObj[hash] };
    return merged;
  }, {} as Record<string, EnrichedTransaction>);
  return Object.values(mergedObj);
};

export const sortByDate = (transactions: EnrichedTransaction[]) => transactions.sort(compareObjectsByDate);
