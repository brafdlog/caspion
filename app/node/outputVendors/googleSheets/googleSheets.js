const moment = require('moment/moment');
const googleSheets = require('./googleSheetsInternalAPI');

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';

async function createTransactionsInGoogleSheets(
  transactions,
  startDate,
  { spreadsheetId, sheetName }
) {
  const transactionsInSheetsFormat = transactions.map(transaction => [
    moment(transaction.date).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.chargedAmount,
    transaction.description,
    transaction.memo,
    transaction.category,
    transaction.companyId,
    transaction.accountNumber
  ]);
  const spreadsheetAppendResult = await googleSheets.appendToSpreadsheet({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    values: transactionsInSheetsFormat
  });
  return spreadsheetAppendResult.data;
}

module.exports = {
  createTransactionsInGoogleSheets
};
