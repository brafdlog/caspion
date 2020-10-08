import { encryptObject, decryptObject } from '@/modules/encryption/credentials';
import { saveIntoAccount, getFromAccount } from '@/modules/encryption/keytar';
import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';

const keytarAccount = 'googleOauth2Token';

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

export async function isConnected() {
  return (await loadToken()) !== null;
}
