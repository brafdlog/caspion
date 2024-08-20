import { type Auth, type drive_v3 as driveV3} from 'googleapis';
import { google } from 'googleapis';
import _ from 'lodash';

export type OAuth2Client = Auth.OAuth2Client;
export type Credentials = Auth.Credentials;

const sheets = google.sheets({ version: 'v4' });
const drive = google.drive({ version: 'v3' });

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export async function appendToSpreadsheet(
  spreadsheetId: string,
  range: string,
  values: unknown[][],
  auth: OAuth2Client,
) {
  const requestBody = {
    values,
  };

  const result = await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody,
  });
  return result;
}

export async function getExistingHashes(
  spreadsheetId: string,
  sheetName: string,
  auth: OAuth2Client,
  hashColumn = 'G',
) {
  const result = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${sheetName}!${hashColumn}:${hashColumn}`,
  });
  const existingHashes: string[] = _.flatten(result.data.values);
  return existingHashes;
}

export type Spreadsheet = Pick<driveV3.Schema$File, 'id' | 'name'>;
export const getAllSpreadsheets = async (auth: OAuth2Client) => {
  const response = await drive.files.list({
    q: 'mimeType="application/vnd.google-apps.spreadsheet"',
    auth,
  });

  return response.data.files as Spreadsheet[];
};

export async function getSheet(
  spreadsheetId: string,
  sheetName: string,
  auth: OAuth2Client,
) {
  const spreadsheetResponse = await sheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  const sheet = spreadsheetResponse.data.sheets?.find(
    ({ properties }) => properties?.title === sheetName,
  );

  return sheet;
}

export async function createSpreadsheet(
  spreadsheetTitle: string,
  sheetTitle: string,
  auth: OAuth2Client,
): Promise<string> {
  const spreadsheetResponse = await sheets.spreadsheets.create({
    auth,
    requestBody: {
      properties: {
        title: spreadsheetTitle,
      },
      sheets: [{ properties: { title: sheetTitle } }],
    },
  });

  const { spreadsheetId } = spreadsheetResponse.data;
  return spreadsheetId!;
}
