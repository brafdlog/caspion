/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Types common with the electron code

import { type } from 'os';

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export enum OutputVendorName {
  YNAB = 'ynab',
  GOOGLE_SHEETS = 'googleSheets',
  JSON = 'json',
  CSV = 'csv'
}

export interface Config {
  outputVendors: {
    [OutputVendorName.GOOGLE_SHEETS]?: GoogleSheetsConfig;
    [OutputVendorName.YNAB]?: YnabConfig;
    [OutputVendorName.JSON]?: JsonConfig;
    [OutputVendorName.CSV]?: CsvConfig;
  };
  scraping: {
    numDaysBack: number;
    showBrowser: boolean;
    accountsToScrape: AccountToScrapeConfig[];
    chromiumPath?: string;
    maxConcurrency?: number;
  };
}

export type OutputVendorConfigs = Exclude<Config['outputVendors'][OutputVendorName], undefined>
export type OutputVendorConfig<T extends OutputVendorName> = Exclude<Config['outputVendors'][T], undefined>

interface OutputVendorConfigBase {
  active: boolean;
}

export interface CsvConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  }
}

export interface JsonConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  }
}

export interface Credentials {
  /**
   * This field is only present if the access_type parameter was set to offline in the authentication request. For details, see Refresh tokens.
   */
  // eslint-disable-next-line camelcase
  refresh_token?: string | null;
  /**
   * The time in ms at which this token is thought to expire.
   */
  // eslint-disable-next-line camelcase
  expiry_date?: number | null;
  /**
   * A token that can be sent to a Google API.
   */
  // eslint-disable-next-line camelcase
  access_token?: string | null;
  /**
   * Identifies the type of token returned. At this time, this field always has the value Bearer.
   */
  // eslint-disable-next-line camelcase
  token_type?: string | null;
  /**
   * A JWT that contains identity information about the user that is digitally signed by Google.
   */
  // eslint-disable-next-line camelcase
  id_token?: string | null;
  /**
   * The scopes of access granted by the access_token expressed as a list of space-delimited, case-sensitive strings.
   */
  scope?: string;
}

export interface GoogleSheetsConfig extends OutputVendorConfigBase {
  options: {
    credentials: Credentials;
    spreadsheetId: string;
  }
}

export interface YnabConfig extends OutputVendorConfigBase {
  options: {
    accessToken: string;
    accountNumbersToYnabAccountIds: { [key: string]: string };
    budgetId: string;
    maxPayeeNameLength?: number;
  };
}

export interface AccountToScrapeConfig {
  id: string;
  // key: CompanyTypes;
  key: string;
  name: string;
  loginFields: Record<string, string>;
  active?: boolean;
}

export enum CompanyTypes {
  hapoalim = 'hapoalim',
  hapoalimBeOnline = 'hapoalimBeOnline',
  beinleumi = 'beinleumi',
  union = 'union',
  amex = 'amex',
  isracard = 'isracard',
  visaCal = 'visaCal',
  max = 'max',
  leumiCard = 'leumiCard',
  otsarHahayal = 'otsarHahayal',
  discount = 'discount',
  mizrahi = 'mizrahi',
  leumi = 'leumi',
  massad = 'massad'
}

export enum AccountType {
  IMPORTER = 'Importer', EXPORTER = 'Exporter'
}

export enum AccountStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  ERROR = 'ERROR'
}

export type BudgetTrackingEvent = {
  message: string;

  vendorId?: CompanyTypes | OutputVendorName;

  accountStatus?: AccountStatus;

  error?: Error;

  accountType?: AccountType;
}

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// End of common types
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Log {
  message: string;
  originalEvent?: BudgetTrackingEvent
}

export interface Account {
  id: string;
  companyId: string;
  displayName: string;
  logo: string;
  type: AccountType;
  active: boolean;
  status?: AccountStatus;
  logs: Log[]
}

export interface Importer extends Account {
  loginFields: Record<string, string>;
}

export interface Exporter extends Account {
  options: object
}

export type AccountMetadata = {
  companyId: string,
  companyName: string,
  logo: string
};

export enum ModalStatus {
  ImporterSettings,
  SettingsExporter,
  Logs,
  Hidden,
  NewScraper,
  GeneralSettings
}
