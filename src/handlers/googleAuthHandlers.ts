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

export const validateTokenHandler = async (event, credentials: any) => {
  const isValid = await validateToken(credentials);
  return isValid;
};

export const getAllSpreadsheetsHandler = async (event, credentials) => {
  const userSpreadsheets = await getAllSpreadsheets(createClient(credentials));
  return userSpreadsheets;
};

export const createSpreadsheetHandler = async (event, { spreadsheetTitle, credentials }) => {
  const spreadsheet = createSpreadsheet(spreadsheetTitle, credentials);
  return spreadsheet;
};
