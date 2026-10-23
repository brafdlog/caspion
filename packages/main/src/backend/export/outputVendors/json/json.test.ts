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
import jsonOutputVendor from './json';

vi.mock('/@/logging/operationLogger', () => ({ logAppEvent: vi.fn() }));

describe('json exporter', () => {
  let dir: string;
  let filePath: string;

  const exportToFile = (transactionsToCreate: ExportTransactionsParams['transactionsToCreate']) =>
    jsonOutputVendor.exportTransactions(
      {
        transactionsToCreate,
        startDate: new Date('2026-09-01'),
        outputVendorsConfig: { json: { active: true, options: { filePath } } },
      } as ExportTransactionsParams,
      { emit: vi.fn() },
    );
  const savedIdentifiers = async () =>
    (JSON.parse(await fs.readFile(filePath, 'utf8')) as { identifier: number }[]).map((t) => t.identifier).sort();

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'caspion-json-'));
    filePath = path.join(dir, 'transactions.json');
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
