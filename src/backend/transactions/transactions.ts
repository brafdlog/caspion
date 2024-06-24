import { uniq } from 'lodash';
import { Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import { EnrichedTransaction } from '../commonTypes';
import { compareObjectsByDate } from './dates';

const unifyHash = (hash: string) => hash
  .replace(/`/g, "'")
  .replace(/00\dZ/, '000Z') // Leumi: Last part of the date is sometimes 000Z, 002Z, 003Z...
  // eslint-disable-next-line no-control-regex
  .replace(/[\u0000-\u001F\u007F-\u009F\u200E\u200F]/g, '') // Special characters
  .replace(/ /g, '');

const transactionArrayToUnifyHash = (transactions: EnrichedTransaction[]) => transactions.reduce((acc, enrichedTransaction) => {
  acc[unifyHash(enrichedTransaction.hash)] = enrichedTransaction;
  return acc;
}, {} as Record<string, EnrichedTransaction>);

export const calculateTransactionHash = ({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) => {
  return unifyHash(`${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`);
};

export const mergeTransactions = (a: EnrichedTransaction[], b: EnrichedTransaction[]) => {
  const aObj = transactionArrayToUnifyHash(a);
  const bObj = transactionArrayToUnifyHash(b);
  const hashes = uniq(Object.keys(aObj).concat(...Object.keys(bObj)));

  const mergedObj = hashes.reduce((merged, hash) => {
    merged[hash] = { ...aObj[hash], ...bObj[hash] };
    return merged;
  }, {} as Record<string, EnrichedTransaction>);
  return Object.values(mergedObj);
};

export const filterExistedHashes = (transactions: EnrichedTransaction[], existingHashes: string[]) => {
  const unifiedExistingHashs = existingHashes.map(unifyHash);
  return transactions.filter(({ hash }) => !unifiedExistingHashs.includes(unifyHash(hash)));
};

export const sortByDate = (transactions: EnrichedTransaction[]) => transactions.sort(compareObjectsByDate);
