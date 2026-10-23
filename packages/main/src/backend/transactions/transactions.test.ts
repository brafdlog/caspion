import { type EnrichedTransaction } from '@/backend/commonTypes';
import { type Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import { describe, expect, test } from 'vitest';
import { booking, enrichBeforeUpgrade, otherCharge, scrape, secondBooking } from './identicalTransactionsFixture';
import { filterExistedHashes, isValidIdentifier, legacyHash, mergeTransactions } from './transactions';

const enrich = enrichBeforeUpgrade;
const baseHash = enrich(booking).hash;
const hashOf = (transactions: EnrichedTransaction[], identifier: Transaction['identifier']) =>
  transactions.find((t) => t.identifier === identifier)!.hash;

describe('isValidIdentifier', () => {
  test.each([51000001, '51000001', 'ABC-123', 0])('%s is valid', (identifier) => {
    expect(isValidIdentifier(identifier)).toBe(true);
  });

  test.each([undefined, null, NaN, '', '  ', 'undefined', 'undefined_1', 'NaN', 'null', 'null_3'])(
    '%s is not valid',
    (identifier) => {
      expect(isValidIdentifier(identifier as Transaction['identifier'])).toBe(false);
    },
  );
});

describe('makeHashesUnique', () => {
  test('a transaction with no identical twin keeps its hash', () => {
    const [transaction] = scrape(booking);

    expect(transaction.hash).toBe(baseHash);
  });

  test('identical transactions with distinct identifiers get distinct hashes', () => {
    const transactions = scrape(booking, secondBooking, otherCharge);

    expect(hashOf(transactions, 51000001)).toBe(baseHash);
    expect(hashOf(transactions, 51000002)).toBe(`${baseHash}|id:51000002`);
    expect(hashOf(transactions, 51000003)).toBe(enrich(otherCharge).hash);
  });

  test('hashes do not depend on the order the scraper returned the rows in', () => {
    const inOrder = scrape(booking, secondBooking);
    const reversed = scrape(secondBooking, booking);

    expect(hashOf(reversed, 51000001)).toBe(hashOf(inOrder, 51000001));
    expect(hashOf(reversed, 51000002)).toBe(hashOf(inOrder, 51000002));
  });

  test('identifiers are ordered numerically', () => {
    const transactions = scrape({ ...booking, identifier: 10 }, { ...booking, identifier: 9 });

    expect(hashOf(transactions, 9)).toBe(baseHash);
  });

  test('identical transactions with placeholder identifiers are numbered', () => {
    const transactions = scrape(
      { ...booking, identifier: 'undefined_1' },
      { ...booking, identifier: 'undefined_2' },
      { ...booking, identifier: undefined },
    );

    expect(transactions.map((t) => t.hash).sort()).toEqual([baseHash, `${baseHash}|n:2`, `${baseHash}|n:3`]);
  });

  test('a repeated identifier is not used to tell transactions apart', () => {
    const transactions = scrape(booking, booking);

    expect(transactions.map((t) => t.hash)).toEqual([baseHash, `${baseHash}|n:2`]);
  });

  test('legacyHash returns the hash identical transactions shared before', () => {
    const transactions = scrape(booking, secondBooking, { ...booking, identifier: undefined });

    expect(transactions.map((t) => legacyHash(t.hash))).toEqual([baseHash, baseHash, baseHash]);
  });
});

describe('mergeTransactions (JSON and CSV exporters)', () => {
  test('identical transactions with distinct identifiers are both kept', () => {
    const merged = mergeTransactions([], scrape(booking, secondBooking));

    expect(merged.map((t) => t.identifier).sort()).toEqual([51000001, 51000002]);
  });

  test('scraping again does not add duplicates', () => {
    const firstRun = mergeTransactions([], scrape(booking, secondBooking, otherCharge));
    const secondRun = mergeTransactions(firstRun, scrape(secondBooking, otherCharge, booking));

    expect(secondRun).toHaveLength(3);
  });

  test('after upgrading, the transaction merged away before is added and nothing is duplicated', () => {
    // Before this fix both bookings had the plain hash and the file kept only one of them
    const savedBeforeUpgrade = mergeTransactions([], [enrich(booking), enrich(secondBooking), enrich(otherCharge)]);
    expect(savedBeforeUpgrade).toHaveLength(2);

    const afterUpgrade = mergeTransactions(savedBeforeUpgrade, scrape(booking, secondBooking, otherCharge));
    const afterNextRun = mergeTransactions(afterUpgrade, scrape(booking, secondBooking, otherCharge));

    expect(afterUpgrade.map((t) => t.identifier).sort()).toEqual([51000001, 51000002, 51000003]);
    expect(afterNextRun).toHaveLength(3);
  });
});

describe('filterExistedHashes (Google Sheets exporter)', () => {
  const existingHashesAfterExporting = (transactions: EnrichedTransaction[], existingHashes: string[]) => [
    ...existingHashes,
    ...filterExistedHashes(transactions, existingHashes).map((t) => t.hash),
  ];

  test('identical transactions with distinct identifiers are both exported', () => {
    expect(filterExistedHashes(scrape(booking, secondBooking), [])).toHaveLength(2);
  });

  test('scraping again does not export anything twice', () => {
    const sheet = existingHashesAfterExporting(scrape(booking, secondBooking), []);

    expect(filterExistedHashes(scrape(secondBooking, booking), sheet)).toEqual([]);
  });

  test('after upgrading, rows exported with the shared plain hash still count, one transaction each', () => {
    // Before this fix, identical transactions exported in the same run were all written with the plain hash
    const sheetBeforeUpgrade = [baseHash, baseHash];

    expect(filterExistedHashes(scrape(booking, secondBooking), sheetBeforeUpgrade)).toEqual([]);
  });

  test('after upgrading, an identical transaction that was skipped before is exported', () => {
    // Before this fix, a transaction whose plain hash was already in the sheet was skipped
    const sheetBeforeUpgrade = [baseHash];

    const toExport = filterExistedHashes(scrape(booking, secondBooking), sheetBeforeUpgrade);

    expect(toExport.map((t) => t.identifier)).toEqual([51000002]);
    expect(filterExistedHashes(scrape(booking, secondBooking), [baseHash, toExport[0].hash])).toEqual([]);
  });

  test('a plain hash is matched exactly before it is used for a suffixed hash', () => {
    const third = { ...booking, identifier: 51000009 };
    const sheet = [baseHash, `${baseHash}|id:51000002`];

    const toExport = filterExistedHashes(scrape(booking, secondBooking, third), sheet);

    expect(toExport.map((t) => t.identifier)).toEqual([51000009]);
  });
});
