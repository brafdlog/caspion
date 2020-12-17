/* eslint-disable */
import { google } from 'googleapis';
import { properties as transactionProperties, transactionArrayToObject } from '../transactions';

// TODO: I think this module should be a class or two.
const spreadsheetConstName = '_ibsd';

const headers = transactionProperties.map((property) => property.name);
const requiredHeaders = transactionProperties.filter((property) => property.hash)
  .map((property) => property.name);

const getSpreadsheetRequest = (spreadsheetId) => ({
  spreadsheetId,
  includeGridData: false,
});

const createSheetRequest = (spreadsheetId) => ({
  spreadsheetId,
  requestBody:
  {
    includeSpreadsheetInResponse: true,
    responseIncludeGridData: false,
    requests: [
      {
        addSheet: {
          properties: {
            title: spreadsheetConstName,
          },
        },
      },
    ],
  },
});

async function getSheetsTitles(sheets, spreadsheetId) {
  const spreadsheet = await sheets.spreadsheets.get(getSpreadsheetRequest(spreadsheetId))
    .then((res) => res.data);
  return spreadsheet.sheets.map((sheet) => sheet.properties.title);
}

async function createNewSheetIfNotExist(sheets, spreadsheetId) {
  const sheetsTitles = await getSheetsTitles(sheets, spreadsheetId);
  if (!sheetsTitles.includes(spreadsheetConstName)) {
    await sheets.spreadsheets.batchUpdate(createSheetRequest(spreadsheetId));
  }
}

async function fetchExistingTransactions(sheets, spreadsheetId) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: spreadsheetConstName,
    });
    return response.data.values || [headers];
  } catch (error) {
    if (error.code && error.code === 400) {
      return [headers];
    }
    throw error;
  }
}

function zip(keys, values) {
  return keys.reduce((prev, current, index) => ({ ...prev, [current]: values[index] }), {});
}

function validateHeaders(headersRow) {
  const missingHeaders = requiredHeaders.filter((header) => !headersRow.includes(header));
  if (missingHeaders.length > 0) {
    throw new Error(`Missing required headers: [${missingHeaders}] in [${headersRow}]`);
  }
}

function convertTransactionsArraysToObject(transactionsArrays) {
  const headersRow = transactionsArrays.shift();
  validateHeaders(headersRow);
  const arrayOfObjects = transactionsArrays.map((transaction) => zip(headers, transaction));
  return transactionArrayToObject(arrayOfObjects);
}

async function getExistingTransactionsObject(sheets, spreadsheetId) {
  const existsArrays = await fetchExistingTransactions(sheets, spreadsheetId);
  return convertTransactionsArraysToObject(existsArrays);
}

function convertTransactionObjectToArrays(transactionObject) {
  const rows = [headers];
  Object.values(transactionObject).forEach((transaction) => {
    const transactionRow = [];
    headers.forEach((header) => {
      transactionRow.push(transaction[header]);
    });
    rows.push(transactionRow);
  });
  return rows;
}

async function saveTransactionsAsObjectToGoogleSheets(sheets, spreadsheetId, transactionObject) {
  const arrays = convertTransactionObjectToArrays(transactionObject);
  await createNewSheetIfNotExist(sheets, spreadsheetId);
  const request = {
    spreadsheetId,
    range: spreadsheetConstName,
    valueInputOption: 'USER_ENTERED',
    includeValuesInResponse: true,
    resource: {
      values: arrays,
    },
  };
  return sheets.spreadsheets.values.update(request);
}

export async function saveTransactionsToGoogleSheets(
  auth,
  spreadsheetId,
  transactionsObject,
) {
  const sheets = google.sheets({ version: 'v4', auth });
  const existTransactionsObject = await getExistingTransactionsObject(sheets, spreadsheetId);
  const existTransactions = Object.keys(existTransactionsObject).length;
  const combinedTransactions = { ...existTransactionsObject, ...transactionsObject };
  const response = await saveTransactionsAsObjectToGoogleSheets(
    sheets,
    spreadsheetId,
    combinedTransactions,
  );

  return {
    status: response.status,
    existTransactions,
    updatedTransactions: response.data.updatedRows - 1,
    statusText: response.statusText,
  };
}

export async function listAllSpreadsheets(auth) {
  const drive = google.drive({ version: 'v3', auth });

  const response = await drive.files.list({
    q: 'mimeType="application/vnd.google-apps.spreadsheet"',
  });

  return response.data.files;
}

export async function createNewSpreadsheet(auth, title) {
  const resource = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: spreadsheetConstName,
        },
      },
    ],
  };
  const sheets = google.sheets({ version: 'v4', auth });

  return (await sheets.spreadsheets.create({ resource })).data;
}
