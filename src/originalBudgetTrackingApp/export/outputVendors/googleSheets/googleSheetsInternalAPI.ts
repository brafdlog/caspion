import _ from 'lodash';
import { google } from 'googleapis';
import { OAuth2Client } from './googleAuth';

const sheets = google.sheets({ version: 'v4' });

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export async function appendToSpreadsheet(spreadsheetId: string, range: string, values: unknown[][], auth: OAuth2Client) {
  const requestBody = {
    values
  };

  const result = await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody
  });
  return result;
}

export async function getExistingHashes(spreadsheetId: string, sheetName: string, auth: OAuth2Client, hashColumn = 'H') {
  const result = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${sheetName}!${hashColumn}:${hashColumn}`
  });
  const existingHashes = _.flatten(result.data.values);
  return existingHashes;
}
