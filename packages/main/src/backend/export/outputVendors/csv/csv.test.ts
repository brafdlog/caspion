import { type ExportTransactionsParams } from '@/backend/commonTypes';
import {
  booking,
  enrichBeforeUpgrade,
  otherCharge,
  scrape,
  secondBooking,
} from '@/backend/transactions/identicalTransactionsFixture';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import csvOutputVendor, { parseTransactions } from './csv';

vi.mock('/@/logging/operationLogger', () => ({ logAppEvent: vi.fn() }));

describe('csv exporter', () => {
  let dir: string;
  let filePath: string;

  const exportToFile = (transactionsToCreate: ExportTransactionsParams['transactionsToCreate']) =>
    csvOutputVendor.exportTransactions(
      {
        transactionsToCreate,
        startDate: new Date('2026-09-01'),
        outputVendorsConfig: { csv: { active: true, options: { filePath } } },
      } as ExportTransactionsParams,
      { emit: vi.fn() },
    );
  const savedIdentifiers = async () =>
    parseTransactions(await fs.readFile(filePath, 'utf8'))
      .map((t) => t.identifier)
      .sort();

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'caspion-csv-'));
    filePath = path.join(dir, 'transactions.csv');
  });
  afterEach(() => fs.rm(dir, { recursive: true, force: true }));

  test('identical same-day transactions are all saved, and saved once', async () => {
    expect(await exportToFile(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 3 });
    expect(await exportToFile(scrape(otherCharge, secondBooking, booking))).toEqual({ exportedTransactionsNum: 0 });

    expect(await savedIdentifiers()).toEqual([51000001, 51000002, 51000003]);
  });

  test('upgrading adds the transaction that was merged away before, without duplicates', async () => {
    await exportToFile([booking, secondBooking, otherCharge].map(enrichBeforeUpgrade));
    expect(await savedIdentifiers()).toHaveLength(2);

    expect(await exportToFile(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 1 });
    expect(await exportToFile(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 0 });
    expect(await savedIdentifiers()).toEqual([51000001, 51000002, 51000003]);
  });
});
