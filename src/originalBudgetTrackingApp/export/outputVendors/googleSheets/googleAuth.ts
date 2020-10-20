import { Auth } from 'googleapis';
import { homepage } from '../../../../../package.json';

export type OAuth2Client = Auth.OAuth2Client;
export type Credentials = Auth.Credentials;

export const clientId = GOOGLE_CLIENT_ID;
export const clientSecret = GOOGLE_CLIENT_SECRET;
export const redirectUri = homepage;
export const scopes = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
];

export const createClient = (credentials: Auth.Credentials) => {
  const authClient = new Auth.OAuth2Client({ clientId, clientSecret, redirectUri });
  authClient.setCredentials(credentials);
  return authClient;
};

export const validateToken = async (credentials: Auth.Credentials) => {
  try {
    const client = createClient(credentials);
    const refreshedToken = await client.getAccessToken();
    if (!refreshedToken.token) {
      console.log('refreshedToken', refreshedToken);
      return false;
    }

    await client.getTokenInfo(refreshedToken.token);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
