import {
  OutputVendorName,
  type EnrichedTransaction,
  type ExportTransactionsFunction,
  type OutputVendor,
} from '@/backend/commonTypes';
import { EventNames, ExporterEvent, type EventPublisher } from '@/backend/eventEmitters/EventEmitter';
import { filterExistedHashes } from '@/backend/transactions/transactions';
import { type Auth } from 'googleapis';
import moment from 'moment/moment';
import { createClient } from './googleAuth';
import * as googleSheets from './googleSheetsInternalAPI';
import { logAppEvent } from '/@/logging/operationLogger';

const GOOGLE_SHEETS_DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_SHEET_NAME = '_caspion';
const COLUMN_HEADERS = [
  'תאריך',
  'סכום',
  'תיאור',
  'תיאור נוסף',
  'קטגוריה',
  'מספר חשבון',
  'hash - לא לגעת',
  'מטבע',
  'סכום מקורי',
  'ת. חיוב',
  'מזהה',
  'סוג',
  'סטטוס',
];

const createTransactionsInGoogleSheets: ExportTransactionsFunction = async (
  { transactionsToCreate: transactions, outputVendorsConfig },
  eventPublisher,
) => {
  const startTime = Date.now();
  const { spreadsheetId, credentials } = outputVendorsConfig.googleSheets!.options;

  logAppEvent('GOOGLE_SHEETS_EXPORT_START', {
    hasSpreadsheetId: !!spreadsheetId,
    hasCredentials: !!credentials,
    transactionsCount: transactions.length,
  });

  if (!credentials) {
    logAppEvent('GOOGLE_SHEETS_ERROR', { error: 'No credentials provided' });
    throw new Error("You must set the 'credentials'");
  }

  const oAuthClient = createClient(credentials);

  logAppEvent('GOOGLE_SHEETS_CHECKING_SHEET');
  const sheet = await googleSheets.getSheet(spreadsheetId, DEFAULT_SHEET_NAME, oAuthClient);
  if (!sheet) {
    logAppEvent('GOOGLE_SHEETS_ERROR', { error: `Sheet ${DEFAULT_SHEET_NAME} not found` });
    throw new Error(`There is no sheet called ${DEFAULT_SHEET_NAME} in the spreadsheet`);
  }

  logAppEvent('GOOGLE_SHEETS_FETCHING_EXISTING_HASHES');
  const hashesAlreadyExistingInGoogleSheets = await googleSheets.getExistingHashes(
    spreadsheetId,
    DEFAULT_SHEET_NAME,
    oAuthClient,
  );
  const transactionsToCreate = filterExistedHashes(transactions, hashesAlreadyExistingInGoogleSheets);

  logAppEvent('GOOGLE_SHEETS_DUPLICATE_CHECK_COMPLETE', {
    totalTransactions: transactions.length,
    alreadyExist: transactions.length - transactionsToCreate.length,
    toCreate: transactionsToCreate.length,
  });

  if (transactionsToCreate.length === 0) {
    await emitProgressEvent(eventPublisher, transactions, 'All transactions already exist in google sheets');
    return {
      exportedTransactionsNum: 0,
    };
  }

  await emitProgressEvent(
    eventPublisher,
    transactions,
    `Creating ${transactionsToCreate.length} transactions in google sheets`,
  );

  const transactionsInSheetsFormat = transactionsToCreate.map((transaction) => [
    moment(transaction.date).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.chargedAmount,
    transaction.description,
    transaction.memo,
    transaction.category,
    transaction.accountNumber,
    transaction.hash,
    transaction.originalCurrency,
    transaction.originalAmount,
    moment(transaction.processedDate).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.identifier,
    transaction.type,
    transaction.status,
  ]);

  logAppEvent('GOOGLE_SHEETS_APPENDING_DATA', { rowCount: transactionsInSheetsFormat.length });
  await googleSheets.appendToSpreadsheet(
    spreadsheetId,
    `${DEFAULT_SHEET_NAME}!A:A`,
    transactionsInSheetsFormat,
    oAuthClient,
  );

  logAppEvent('GOOGLE_SHEETS_SUCCESS', {
    createdCount: transactionsToCreate.length,
    duration: `${Date.now() - startTime}ms`,
  });
  return {
    exportedTransactionsNum: transactionsToCreate.length,
  };
};

async function emitProgressEvent(
  eventPublisher: EventPublisher,
  allTransactions: EnrichedTransaction[],
  message: string,
) {
  await eventPublisher.emit(
    EventNames.EXPORTER_PROGRESS,
    new ExporterEvent({
      message,
      exporterName: googleSheetsOutputVendor.name,
      allTransactions,
    }),
  );
}

export async function createSpreadsheet(spreadsheetTitle: string, credentials: Auth.Credentials): Promise<string> {
  const auth = createClient(credentials);
  const spreadsheetId = await googleSheets.createSpreadsheet(spreadsheetTitle, DEFAULT_SHEET_NAME, auth);

  await googleSheets.appendToSpreadsheet(spreadsheetId, `${DEFAULT_SHEET_NAME}!A:A`, [COLUMN_HEADERS], auth);

  return spreadsheetId;
}

export const googleSheetsOutputVendor: OutputVendor = {
  name: OutputVendorName.GOOGLE_SHEETS,
  exportTransactions: createTransactionsInGoogleSheets,
};
