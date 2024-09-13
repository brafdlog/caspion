import {
  clientId,
  clientSecret,
  redirectUri,
  scopes,
} from '@/backend/export/outputVendors/googleSheets/googleAuth';
import ElectronGoogleOAuth2 from 'electron-google-oauth2';

export default () => {
  if (!clientId || !clientSecret) throw Error("No 'clientId' or 'clientSecret' for google login");

  const electronGoogleOAuth2 = new ElectronGoogleOAuth2(clientId, clientSecret, scopes, {
    successRedirectURL: redirectUri,
  });

  return electronGoogleOAuth2.openAuthWindowAndGetTokens();
};
