import { type Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import _ from 'lodash';
import { type EnrichedTransaction } from '../commonTypes';
import { compareObjectsByDate } from './dates';

const { uniq, countBy, groupBy } = _;

const unifyHash = (hash: string) =>
  hash
    .replace(/`/g, "'")
    .replace(/00\dZ/, '000Z') // Leumi: Last part of the date is sometimes 000Z, 002Z, 003Z...
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F-\u009F\u200E]/g, '') // Special characters
    .replace('‏', ''); // Special character

const transactionArrayToUnifyHash = (transactions: EnrichedTransaction[]) =>
  transactions.reduce(
    (acc, enrichedTransaction) => {
      acc[unifyHash(enrichedTransaction.hash)] = enrichedTransaction;
      return acc;
    },
    {} as Record<string, EnrichedTransaction>,
  );

export const calculateTransactionHash = (
  { date, chargedAmount, description, memo }: Transaction,
  companyId: string,
  accountNumber: string,
) => {
  return unifyHash(`${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`);
};

// Scrapers fill in placeholders when they have no real identifier, e.g. Max builds `undefined_<n>` when the ARN is missing
const PLACEHOLDER_IDENTIFIER = /^(undefined|null|nan)?(_\d+)?$/i;

export const isValidIdentifier = (identifier: Transaction['identifier']) => {
  if (identifier === undefined || identifier === null) return false;
  if (typeof identifier === 'number') return Number.isFinite(identifier);
  return !PLACEHOLDER_IDENTIFIER.test(identifier.trim());
};

// Suffix that tells apart transactions whose base hash is the same, e.g. `<base hash>|id:12345` or `<base hash>|n:2`
const DUPLICATE_SUFFIX = /\|(?:id:[^|]*|n:\d+)$/;

/** The hash this transaction had before identical transactions got a suffix, used to match already exported data */
export const legacyHash = (hash: string) => hash.replace(DUPLICATE_SUFFIX, '');

const compareIdentical = (a: EnrichedTransaction, b: EnrichedTransaction) => {
  const aValid = isValidIdentifier(a.identifier);
  const bValid = isValidIdentifier(b.identifier);
  if (aValid !== bValid) return aValid ? -1 : 1;
  if (aValid) return String(a.identifier).localeCompare(String(b.identifier), 'en', { numeric: true });
  const stableKey = ({ processedDate, originalAmount, originalCurrency, type, status, installments }: Transaction) =>
    JSON.stringify([processedDate, originalAmount, originalCurrency, type, status, installments]);
  return stableKey(a).localeCompare(stableKey(b));
};

/**
 * Transactions with the same account, date, amount, description and memo get the same hash, so exporters merge them
 * into one. This gives each of them its own hash. The first one, in an order that doesn't depend on the scraper's row
 * order, keeps the plain hash so it still matches what was exported before; the others get a suffix with their
 * identifier when it is valid and unique, or with their position otherwise.
 */
export const makeHashesUnique = (transactions: EnrichedTransaction[]): EnrichedTransaction[] => {
  const newHashes = new Map<EnrichedTransaction, string>();
  Object.values(groupBy(transactions, ({ hash }) => unifyHash(hash)))
    .filter((group) => group.length > 1)
    .forEach((group) => {
      const identifierCounts = countBy(
        group.filter(({ identifier }) => isValidIdentifier(identifier)),
        'identifier',
      );
      [...group].sort(compareIdentical).forEach((transaction, index) => {
        if (index === 0) return;
        const { identifier } = transaction;
        const suffix =
          isValidIdentifier(identifier) && identifierCounts[String(identifier)] === 1
            ? `id:${String(identifier).replace(/\|/g, '')}`
            : `n:${index + 1}`;
        newHashes.set(transaction, `${transaction.hash}|${suffix}`);
      });
    });
  return transactions.map((transaction) =>
    newHashes.has(transaction) ? { ...transaction, hash: newHashes.get(transaction)! } : transaction,
  );
};

export const mergeTransactions = (a: EnrichedTransaction[], b: EnrichedTransaction[]) => {
  const aObj = transactionArrayToUnifyHash(a);
  const bObj = transactionArrayToUnifyHash(b);
  const hashes = uniq(Object.keys(aObj).concat(...Object.keys(bObj)));

  const mergedObj = hashes.reduce((merged: Record<string, EnrichedTransaction>, hash: string) => {
    merged[hash] = { ...aObj[hash], ...bObj[hash] };
    return merged;
  }, {});
  return Object.values(mergedObj);
};

/**
 * Each existing hash accounts for one transaction only. Exact matches go first; a hash left over after that also
 * accounts for one transaction with a suffixed hash, because before suffixes existed identical transactions were all
 * exported with the plain hash.
 */
export const filterExistedHashes = (transactions: EnrichedTransaction[], existingHashes: string[]) => {
  const remaining = countBy(existingHashes.map(unifyHash));
  const claim = (hash: string) => {
    if (!remaining[hash]) return false;
    remaining[hash]--;
    return true;
  };
  const exactMatches = transactions.map(({ hash }) => claim(unifyHash(hash)));
  return transactions.filter(({ hash }, index) => {
    if (exactMatches[index]) return false;
    const unified = unifyHash(hash);
    return legacyHash(unified) === unified || !claim(legacyHash(unified));
  });
};

export const sortByDate = (transactions: EnrichedTransaction[]) => transactions.sort(compareObjectsByDate);
