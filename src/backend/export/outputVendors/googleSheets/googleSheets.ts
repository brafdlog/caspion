import {
  EnrichedTransaction, ExportTransactionsFunction, OutputVendor, OutputVendorName
} from '@/backend/commonTypes';
import { EventNames, EventPublisher, ExporterEvent } from '@/backend/eventEmitters/EventEmitter';
import moment from 'moment/moment';
import { Auth } from 'googleapis';
import { createClient } from './googleAuth';
import * as googleSheets from './googleSheetsInternalAPI';
import { appendToSpreadsheet } from './googleSheetsInternalAPI';

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';
const DEFAULT_SHEET_NAME = '_budget-tracking';
const COLUMN_HEADERS = ['תאריך', 'סכום', 'תיאור', 'תיאור נוסף', 'קטגוריה', 'מספר חשבון', 'hash - לא לגעת'];

const createTransactionsInGoogleSheets: ExportTransactionsFunction = async (
  { transactionsToCreate: transactions, outputVendorsConfig },
  eventPublisher
) => {
  const { spreadsheetId, credentials } = outputVendorsConfig.googleSheets!.options;
  if (!credentials) throw new Error('You must set the \'credentials\'');
  const oAuthClient = createClient(credentials);

  const sheetName = await getSheetName(spreadsheetId, oAuthClient);

  const hashesAlreadyExistingInGoogleSheets = await googleSheets.getExistingHashes(spreadsheetId, sheetName, oAuthClient);
  const transactionsToCreate = transactions.filter((transaction) => !hashesAlreadyExistingInGoogleSheets.includes(transaction.hash));

  if (transactionsToCreate.length === 0) {
    await emitProgressEvent(eventPublisher, transactions, 'All transactions already exist in google sheets');
    return null;
  }

  await emitProgressEvent(eventPublisher, transactions, `Creating ${transactionsToCreate.length} transactions in google sheets`);

  const transactionsInSheetsFormat = transactionsToCreate.map((transaction) => [
    moment(transaction.date).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.chargedAmount,
    transaction.description,
    transaction.memo,
    transaction.category,
    transaction.accountNumber,
    transaction.hash
  ]);

  const spreadsheetAppendResult = await googleSheets.appendToSpreadsheet(
    spreadsheetId, `${sheetName}!A:A`, transactionsInSheetsFormat, oAuthClient
  );
  return spreadsheetAppendResult.data;
};

async function getSheetName(spreadsheetId, oAuthClient) {
  const sheetNames = await googleSheets.getSheetNames(spreadsheetId, oAuthClient);
  if (sheetNames.length === 1) {
    return sheetNames[0];
  }
  if (sheetNames.includes(DEFAULT_SHEET_NAME)) {
    return DEFAULT_SHEET_NAME;
  }
  throw new Error(`Cant find sheet to update. Sheet names are: ${sheetNames}`);
}

async function emitProgressEvent(eventPublisher: EventPublisher, allTransactions: EnrichedTransaction[], message: string) {
  await eventPublisher.emit(EventNames.EXPORTER_PROGRESS, new ExporterEvent({
    message, exporterName: googleSheetsOutputVendor.name, allTransactions
  }));
}

export async function createSpreadsheet(spreadsheetTitle: string, credentials: Auth.Credentials): Promise<string> {
  const auth = createClient(credentials);
  const spreadsheetId = await googleSheets.createSpreadsheet(spreadsheetTitle, DEFAULT_SHEET_NAME, auth);

  await appendToSpreadsheet(spreadsheetId, `${DEFAULT_SHEET_NAME}!A:A`, [COLUMN_HEADERS], auth);

  return spreadsheetId;
}

export const googleSheetsOutputVendor: OutputVendor = {
  name: OutputVendorName.GOOGLE_SHEETS,
  exportTransactions: createTransactionsInGoogleSheets,
};
