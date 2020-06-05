const _ = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const { google } = require('googleapis/build/src/index');

const readFile = promisify(fs.readFile);
const sheets = google.sheets({ version: 'v4' });

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function appendToSpreadsheet({
  spreadsheetId, range, values, credentialsFilePath
}) {
  const jwtClient = await loadCredentialsAndAuthorize(credentialsFilePath);

  const resource = {
    values
  };

  const result = await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource
  });
  console.log('Updates: ', result.data.updates);
  return result;
}

async function getExistingHashes({
  spreadsheetId, credentialsFilePath, sheetName, hashColumn = 'H'
}) {
  const jwtClient = await loadCredentialsAndAuthorize(credentialsFilePath);

  const result = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId,
    range: `${sheetName}!${hashColumn}:${hashColumn}`
  });
  const existingHashes = _.flatten(result.data.values);
  return existingHashes;
}

async function loadCredentialsAndAuthorize(credentialsFilePath) {
  const credentialsStr = await readFile(credentialsFilePath, 'utf8');
  const credentials = JSON.parse(credentialsStr);
  const jwtClient = new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);

  await jwtClient.authorize();

  return jwtClient;
}

module.exports = {
  appendToSpreadsheet,
  getExistingHashes
};
