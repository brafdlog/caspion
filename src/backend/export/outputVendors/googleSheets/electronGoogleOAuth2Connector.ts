import ElectronGoogleOAuth2 from 'electron-google-oauth2';
import {
  clientId,
  clientSecret,
  redirectUri,
  scopes,
} from '@/backend/export/outputVendors/googleSheets/googleAuth';

export default () => {
  if (!clientId || !clientSecret)
    throw Error("No 'clientId' or 'clientSecret' for google login");

  const electronGoogleOAuth2 = new ElectronGoogleOAuth2(
    clientId,
    clientSecret,
    scopes,
    { successRedirectURL: redirectUri },
  );

  return electronGoogleOAuth2.openAuthWindowAndGetTokens();
};
