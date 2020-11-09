import {
  clientId, clientSecret, redirectUri, scopes
} from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';

export default () => {
  const electronGoogleOAuth2 = new ElectronGoogleOAuth2(
    clientId,
    clientSecret,
    scopes,
    { successRedirectURL: redirectUri }
  );

  return electronGoogleOAuth2.openAuthWindowAndGetTokens();
};
