import {
  EnrichedTransaction, ExportTransactionsFunction, OutputVendor, OutputVendorName
} from '@/originalBudgetTrackingApp/commonTypes';
import { EventNames, EventPublisher } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import moment from 'moment/moment';
import { createClient } from './googleAuth';
import * as googleSheets from './googleSheetsInternalAPI';

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';
const sheetName = '_budget-tracking';

const createTransactionsInGoogleSheets: ExportTransactionsFunction = async (
  { transactionsToCreate: transactions, outputVendorsConfig },
  eventPublisher
) => {
  const { spreadsheetId, credentials } = outputVendorsConfig.googleSheets!.options;
  if (!credentials) throw new Error('You must set the \'credentials\'');
  const oAuthClient = createClient(credentials);

  const sheet = await googleSheets.getSheet(spreadsheetId, sheetName, oAuthClient);
  if (!sheet) {
    throw new Error(`There is no sheet called ${sheetName} in the spreadsheet`);
  }

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

async function emitProgressEvent(eventPublisher: EventPublisher, allTransactions: EnrichedTransaction[], message: string) {
  await eventPublisher.emit(EventNames.EXPORTER_PROGRESS, { name: googleSheetsOutputVendor.name, allTransactions, message });
}

export const googleSheetsOutputVendor: OutputVendor = {
  name: OutputVendorName.GOOGLE_SHEETS,
  exportTransactions: createTransactionsInGoogleSheets,
};
