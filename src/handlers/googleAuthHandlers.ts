import ElectronGoogleOAuth2 from 'electron-google-oauth2';
import {
  clientId, clientSecret, createClient, redirectUri, scopes, validateToken
} from '@/backend/export/outputVendors/googleSheets/googleAuth';
import { getAllSpreadsheets } from '@/backend/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import { createSpreadsheet } from '@/backend/export/outputVendors/googleSheets/googleSheets';

export const googleLoginHandler = () => {
  if (!clientId || !clientSecret) throw Error('No \'clientId\' or \'clientSecret\' for google login');

  const electronGoogleOAuth2 = new ElectronGoogleOAuth2(
    clientId,
    clientSecret,
    scopes,
    { successRedirectURL: redirectUri }
  );

  return electronGoogleOAuth2.openAuthWindowAndGetTokens();
};

export const validateGoogleTokenHandler = async (event, credentials) => {
  const googleCredentials = JSON.parse(credentials);
  const isValid = await validateToken(googleCredentials);
  return isValid;
};

export const getAllSpreadsheetsHandler = async (event, credentials) => {
  const googleCredentials = JSON.parse(credentials);
  const userSpreadsheets = await getAllSpreadsheets(createClient(googleCredentials));
  return userSpreadsheets;
};

export const createSpreadsheetHandler = async (event, { spreadsheetTitle, credentials }) => {
  const googleCredentials = JSON.parse(credentials);
  const spreadsheet = createSpreadsheet(spreadsheetTitle, googleCredentials);
  return spreadsheet;
};
