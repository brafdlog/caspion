import ElectronGoogleOAuth2 from 'electron-google-oauth2';
import {
  clientId,
  clientSecret,
  redirectUri,
  scopes,
} from './googleAuth';

export default () => {
  if (!clientId || !clientSecret)
    throw Error("No 'clientId' or 'clientSecret' for google login");

  // @ts-expect-error - The package 'electron-google-oauth2' is my own package, I don't know why it's not recognized
  const electronGoogleOAuth2 = new ElectronGoogleOAuth2.default(
    clientId,
    clientSecret,
    scopes,
    { successRedirectURL: redirectUri },
  );

  return electronGoogleOAuth2.openAuthWindowAndGetTokens();
};
