import { type ExportTransactionsParams } from '@/backend/commonTypes';
import {
  booking,
  enrichBeforeUpgrade,
  otherCharge,
  scrape,
  secondBooking,
} from '@/backend/transactions/identicalTransactionsFixture';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { googleSheetsOutputVendor } from './googleSheets';
import * as googleSheets from './googleSheetsInternalAPI';

vi.mock('/@/logging/operationLogger', () => ({ logAppEvent: vi.fn() }));
vi.mock('./googleAuth', () => ({ createClient: vi.fn() }));
vi.mock('./googleSheetsInternalAPI', () => ({
  getSheet: vi.fn(),
  getExistingHashes: vi.fn(),
  appendToSpreadsheet: vi.fn(),
}));

const HASH_COLUMN = 6;
const IDENTIFIER_COLUMN = 10;

describe('google sheets exporter', () => {
  let rows: unknown[][];

  const exportToSheet = (transactionsToCreate: ExportTransactionsParams['transactionsToCreate']) =>
    googleSheetsOutputVendor.exportTransactions(
      {
        transactionsToCreate,
        startDate: new Date('2026-09-01'),
        outputVendorsConfig: {
          googleSheets: { active: true, options: { spreadsheetId: 'SHEET_ID', credentials: {} } },
        },
      } as ExportTransactionsParams,
      { emit: vi.fn() },
    );

  beforeEach(() => {
    rows = [];
    vi.mocked(googleSheets.getSheet).mockResolvedValue({});
    vi.mocked(googleSheets.getExistingHashes).mockImplementation(async () =>
      rows.map((row) => row[HASH_COLUMN] as string),
    );
    vi.mocked(googleSheets.appendToSpreadsheet).mockImplementation(async (_id, _range, newRows) => {
      rows.push(...(newRows as unknown[][]));
      return {} as never;
    });
  });

  test('identical same-day transactions are all added, and added once', async () => {
    expect(await exportToSheet(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 3 });
    expect(await exportToSheet(scrape(otherCharge, secondBooking, booking))).toEqual({ exportedTransactionsNum: 0 });

    expect(rows.map((row) => row[IDENTIFIER_COLUMN]).sort()).toEqual([51000001, 51000002, 51000003]);
  });

  test('upgrading does not duplicate identical transactions that were added with the same hash', async () => {
    await exportToSheet([booking, secondBooking, otherCharge].map(enrichBeforeUpgrade));
    expect(rows).toHaveLength(3);

    expect(await exportToSheet(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 0 });
    expect(rows).toHaveLength(3);
  });

  test('upgrading adds an identical transaction that was skipped before', async () => {
    // Before this fix the second booking, scraped in a later run than the first, was skipped because its hash was
    // already in the sheet
    await exportToSheet([booking, otherCharge].map(enrichBeforeUpgrade));

    expect(await exportToSheet(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 1 });
    expect(await exportToSheet(scrape(booking, secondBooking, otherCharge))).toEqual({ exportedTransactionsNum: 0 });
    expect(rows.map((row) => row[IDENTIFIER_COLUMN]).sort()).toEqual([51000001, 51000002, 51000003]);
  });
});
