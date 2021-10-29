

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Types common with the electron code
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

export interface GoogleSheetsConfig extends OutputVendorConfigBase {
  options: {
    // credentials: Credentials;
    credentials: string;
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

export class BudgetTrackingEvent {
  message: string;

  vendorId?: CompanyTypes | OutputVendorName;

  accountStatus?: AccountStatus;

  error?: Error;

  accountType?: AccountType;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// End of common types
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Log {
  message: string;
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

export type AccountMetadata = {
  companyId: string,
  companyName: string,
  logo: string
};

export enum ModalStatus {
  Settings,
  Logs,
  Hidden
}