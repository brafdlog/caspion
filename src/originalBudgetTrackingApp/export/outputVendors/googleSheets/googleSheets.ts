import moment from 'moment/moment';
import {
  EnrichedTransaction, OutputVendor, OutputVendorName, ExportTransactionsFunction
} from '@/originalBudgetTrackingApp/commonTypes';
import { BudgetTrackingEventEmitter, EventNames } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import * as googleSheets from './googleSheetsInternalAPI';

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';

const createTransactionsInGoogleSheets: ExportTransactionsFunction = async (
  { transactionsToCreate: transactions, outputVendorsConfig },
  eventEmitter
) => {
  const { spreadsheetId, sheetName, credentialsFilePath } = outputVendorsConfig.googleSheets!.options;
  const hashesAlreadyExistingInGoogleSheets = await googleSheets.getExistingHashes({ spreadsheetId, sheetName, credentialsFilePath });
  const transactionsToCreate = transactions.filter((transaction) => !hashesAlreadyExistingInGoogleSheets.includes(transaction.hash));
  if (transactionsToCreate.length === 0) {
    await emitProgressEvent(eventEmitter, transactions, 'All transactions already exist in google sheets');
    return null;
  }
  await emitProgressEvent(eventEmitter, transactions, `Creating ${transactionsToCreate.length} transactions in google sheets`);

  const transactionsInSheetsFormat = transactionsToCreate.map((transaction) => [
    moment(transaction.date).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.chargedAmount,
    transaction.description,
    transaction.memo,
    transaction.category,
    transaction.accountNumber,
    transaction.hash
  ]);

  const spreadsheetAppendResult = await googleSheets.appendToSpreadsheet({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    values: transactionsInSheetsFormat,
    credentialsFilePath
  });
  return spreadsheetAppendResult.data;
};

async function emitProgressEvent(eventEmitter: BudgetTrackingEventEmitter, allTransactions: EnrichedTransaction[], message: string) {
  await eventEmitter.emit(EventNames.EXPORTER_PROGRESS, { name: googleSheetsOutputVendor.name, allTransactions, message });
}

export const googleSheetsOutputVendor: OutputVendor = {
  name: OutputVendorName.GOOGLE_SHEETS,
  exportTransactions: createTransactionsInGoogleSheets,
};
