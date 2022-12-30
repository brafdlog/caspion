import ElectronGoogleOAuth2 from 'electron-google-oauth2';
import {
  clientId, clientSecret, redirectUri, scopes, validateToken
} from '@/backend/export/outputVendors/googleSheets/googleAuth';

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
