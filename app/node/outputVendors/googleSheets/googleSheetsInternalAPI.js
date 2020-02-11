const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis/build/src/index');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file googleApiToken.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'googleApiToken.json';

async function loadCredentialsAndAuthorize(credentialsFilePath) {
  const credentialsStr = await new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile(credentialsFilePath, (err, content) => {
      if (err) {
        console.log('Error loading client secret file:', err);
        reject(err);
      } else {
        resolve(content);
      }
    });
  });

  // Authorize a client with credentials, then call the Google Sheets API.
  const credentials = JSON.parse(credentialsStr);
  return authorize(credentials);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  /* eslint-disable-next-line camelcase */
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  return new Promise(resolve => {
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, resolve);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) console.error(error);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function appendToSpreadsheet({ spreadsheetId, range, values, credentialsFilePath }) {
  const auth = await loadCredentialsAndAuthorize(credentialsFilePath);
  const sheets = google.sheets({ version: 'v4', auth });

  const resource = {
    values
  };
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource
      },
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('Updates: ', result.data.updates);
          resolve(result);
        }
      }
    );
  });
}

module.exports = {
  appendToSpreadsheet
};
