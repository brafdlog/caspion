import GoogleSpreadsheet from 'google-spreadsheet';
import { google } from 'googleapis';
import mapKeys from 'lodash.mapkeys';
import pick from 'lodash.pick';
import { promisify } from 'util';
import { properties, transactionArrayToObject } from '../transactions';
import creds from './googleServiceAccount';

const spreadsheetConstName = '_ibsd';

const headers = properties.map((prop) => prop.name.toLowerCase());
const lowerHeaderToUpper = properties.reduce((prev, current) => {
  prev[current.name.toLowerCase()] = current.name;
  return prev;
}, {});

// Promisify
async function useServiceAccountAuth(doc, creds) {
  await promisify(doc.useServiceAccountAuth)(creds);
}

async function getInfo(doc) {
  return promisify(doc.getInfo)();
}

async function addWorksheet(doc, options) {
  return promisify(doc.addWorksheet).call(doc, options);
}

async function getRows(worksheet, options) {
  return promisify(worksheet.getRows)(options);
}

async function clear(worksheet) {
  return promisify(worksheet.clear)();
}

async function setHeaderRow(worksheet, values) {
  return promisify(worksheet.setHeaderRow)(values);
}

async function addRow(worksheet, newRow) {
  return promisify(worksheet.addRow)(newRow);
}


async function getGoogleSpreadsheetDoc(spreadsheetID) {
  const doc = new GoogleSpreadsheet(spreadsheetID);
  await useServiceAccountAuth(doc, creds);
  return doc;
}

async function getWorksheet(doc, title) {
  const worksheet = (await getInfo(doc)).worksheets.find((worksheet) => worksheet.title === title);
  if (worksheet) return worksheet;

  return addWorksheet(doc, { title, headers });
}

async function readTransactionsFromWorksheet(worksheet) {
  const transactions = (await getRows(worksheet, {})).map((row) => pick(row, headers));
  const transactionsRealProperties = transactions.map(
    (transaction) => mapKeys(transaction, (_value, key) => lowerHeaderToUpper[key]),
  );
  return transactionArrayToObject(transactionsRealProperties);
}

async function SaveTransactionsToWorksheet(worksheet, transactionsArray) {
  await clear(worksheet);
  await setHeaderRow(worksheet, headers);

  transactionsArray.map((transaction) => mapKeys(transaction, (_value, key) => key.toLowerCase()))
    .forEach(async (transaction) => {
      await addRow(worksheet, transaction);
    });
}

export default async function saveTransactionsToGoogleSheets(
  sheetSharingLink, transactionsObjectToSave,
) {
  const spreadsheetID = sheetSharingLink.match(/\w{30}-\w{13}/)[0];
  const doc = await getGoogleSpreadsheetDoc(spreadsheetID);
  const worksheet = await getWorksheet(doc, spreadsheetConstName);
  const transactionsFromWs = await readTransactionsFromWorksheet(worksheet);

  const transactionsCombine = { ...transactionsFromWs, ...transactionsObjectToSave };
  await SaveTransactionsToWorksheet(worksheet, Object.values(transactionsCombine));

  return {
    before: Object.keys(transactionsFromWs).length,
    new: Object.keys(transactionsObjectToSave).length,
    combine: Object.keys(transactionsCombine).length,
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
  };
  const sheets = google.sheets({ version: 'v4', auth });

  return (await sheets.spreadsheets.create({ resource })).data;
}
