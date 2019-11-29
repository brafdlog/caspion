import { promisify } from 'util';
import pick from 'lodash.pick';
import GoogleSpreadsheet from 'google-spreadsheet';
import { properties } from './transactions';
import creds from '../../../client_secret.json';

const spreadsheetConstName = '_ibsd';

const headers = properties.map((prop) => prop.name.toLowerCase());

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


// Create a document object using the ID of the spreadsheet - obtained from its URL.

const SPREADSHEET_ID = '1TTOdzpkbYTWJMHVjDh7wb6ith27Hc-Wyc0pqMoV7K5A';

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

export default async function foo() {
  const doc = await getGoogleSpreadsheetDoc(SPREADSHEET_ID);
  const worksheet = await getWorksheet(doc, spreadsheetConstName);
  const transactions = (await getRows(worksheet, {})).map((row) => pick(row, headers));
  console.log(transactions);
}
