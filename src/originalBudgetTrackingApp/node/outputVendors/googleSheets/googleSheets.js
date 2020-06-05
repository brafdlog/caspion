const moment = require('moment/moment');
const googleSheets = require('./googleSheetsInternalAPI');

const GOOGLE_SHEETS_DATE_FORMAT = 'DD/MM/YYYY';

async function createTransactionsInGoogleSheets(transactions, startDate, { spreadsheetId, sheetName, credentialsFilePath }) {
  console.log(`Got ${transactions.length} transactions to create in google sheets`);
  const hashesAlreadyExistingInGoogleSheets = await googleSheets.getExistingHashes({ spreadsheetId, sheetName, credentialsFilePath });
  const transactionsToCreate = transactions.filter(transaction => !hashesAlreadyExistingInGoogleSheets.includes(transaction.hash));
  if (transactionsToCreate.length === 0) {
    console.log('All transactions already exist in google sheets');
    return;
  }
  console.log(
    `Creating ${transactionsToCreate.length} transactions (${transactions.length -
      transactionsToCreate.length} transaction already exist in google sheets)`
  );

  const transactionsInSheetsFormat = transactionsToCreate.map(transaction => [
    moment(transaction.date).format(GOOGLE_SHEETS_DATE_FORMAT),
    transaction.chargedAmount,
    transaction.description,
    transaction.memo,
    transaction.category,
    transaction.companyId,
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

module.exports = {
  createTransactionsInGoogleSheets
};
