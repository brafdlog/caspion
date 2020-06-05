import { encryptObject, decryptObject } from '@/modules/encryption/credentials';
import { saveIntoAccount, getFromAccount } from '@/modules/encryption/keytar';
import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';


const keytarAccount = 'googleOauth2Token';
const successRedirectURL = 'https://github.com/baruchiro/israeli-bank-scrapers-desktop';

// eslint-disable-next-line camelcase
async function saveToken({ refresh_token }) {
  const encryptedToken = await encryptObject({ refresh_token });
  const strToken = JSON.stringify(encryptedToken);
  return saveIntoAccount(keytarAccount, strToken);
}

async function loadToken() {
  const strToken = await getFromAccount(keytarAccount);
  if (strToken === null) return null;
  const encryptedToken = JSON.parse(strToken);
  return decryptObject(encryptedToken);
}

export async function CreateClient() {
  const myApiOauth = new ElectronGoogleOAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
    { successRedirectURL },
  );

  myApiOauth.on('tokens', async (tokens) => {
    if (tokens.refresh_token) {
      await saveToken(tokens);
    }
  });

  const savedToken = await loadToken();

  if (savedToken !== null) {
    myApiOauth.setTokens(savedToken);
  } else {
    const token = await myApiOauth.openAuthWindowAndGetTokens();
    await saveToken(token);
    myApiOauth.setTokens(token);
  }
  return myApiOauth.oauth2Client;
}

export async function isConnected() {
  return (await loadToken()) !== null;
}
