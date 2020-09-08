import moment from 'moment/moment';
import { EnrichedTransaction, OutputVendor, OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { Config } from '../../../configManager/configManager';
import * as googleSheets from './googleSheetsInternalAPI';

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';

export const googleSheetsOutputVendor: OutputVendor = {
  name: OutputVendorName.GOOGLE_SHEETS,
  exportTransactions: createTransactionsInGoogleSheets,
};

export async function createTransactionsInGoogleSheets(transactions: EnrichedTransaction[], startDate: Date, outputVendorConfig: Config['outputVendors']) {
  const { spreadsheetId, sheetName, credentialsFilePath } = outputVendorConfig.googleSheets!.options;
  console.log(`Got ${transactions.length} transactions to create in google sheets`);
  const hashesAlreadyExistingInGoogleSheets = await googleSheets.getExistingHashes({ spreadsheetId, sheetName, credentialsFilePath });
  const transactionsToCreate = transactions.filter((transaction) => !hashesAlreadyExistingInGoogleSheets.includes(transaction.hash));
  if (transactionsToCreate.length === 0) {
    console.log('All transactions already exist in google sheets');
    return null;
  }
  console.log(
    `Creating ${transactionsToCreate.length} transactions (${transactions.length
      - transactionsToCreate.length} transaction already exist in google sheets)`
  );

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
}
