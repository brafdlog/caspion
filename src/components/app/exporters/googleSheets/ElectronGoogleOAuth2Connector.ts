import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';
import { homepage } from '../../../../../package.json';

type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type Credentials = Unpromise<ReturnType<typeof ElectronGoogleOAuth2.prototype.openAuthWindowAndGetTokens>>

type SaveTokenCallback = (credentials: Credentials) => void

export default class ElectronGoogleOAuth2Connector {
  private electronGoogleOAuth2: ElectronGoogleOAuth2;

  private scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
  ]

  private savedToekn?: Credentials;

  constructor(onToken: SaveTokenCallback, savedToken?: Credentials) {
    this.savedToekn = savedToken;

    this.electronGoogleOAuth2 = new ElectronGoogleOAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      this.scopes,
      { successRedirectURL: homepage },
    );

    this.electronGoogleOAuth2.on('tokens', onToken);
  }

  login = async () => {
    if (this.isTokenValid()) {
      this.electronGoogleOAuth2.setTokens(this.savedToekn!);
    } else {
      this.savedToekn = await this.electronGoogleOAuth2.openAuthWindowAndGetTokens();
      this.electronGoogleOAuth2.setTokens(this.savedToekn);
    }
    return this.electronGoogleOAuth2.oauth2Client;
  }

  private isTokenValid = () => !!this.savedToekn
}
