/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Types common with the electron code

import { type Auth, type drive_v3 } from 'googleapis';
import { type Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import { type BudgetSummary, type Account as YnabAccount } from 'ynab';

export type Credentials = Auth.Credentials;
export type Spreadsheet = Pick<drive_v3.Schema$File, 'id' | 'name'>;

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export enum OutputVendorName {
  YNAB = 'ynab',
  GOOGLE_SHEETS = 'googleSheets',
  JSON = 'json',
  CSV = 'csv',
}

export interface Config {
  outputVendors: {
    [OutputVendorName.GOOGLE_SHEETS]?: GoogleSheetsConfig;
    [OutputVendorName.YNAB]?: YnabConfig;
    [OutputVendorName.JSON]?: JsonConfig;
    [OutputVendorName.CSV]?: CsvConfig;
  };
  scraping: {
    timeout: number;
    numDaysBack: number;
    showBrowser: boolean;
    accountsToScrape: AccountToScrapeConfig[];
    chromiumPath?: string;
    maxConcurrency?: number;
  };
}

export interface AppInfo {
  sourceCommitShort: string;
  repository: string;
  discordChanel: string;
  currentVersion: string;
}

export type OutputVendorConfigs = Exclude<Config['outputVendors'][OutputVendorName], undefined>;
export type OutputVendorConfig<T extends OutputVendorName> = Exclude<
  Config['outputVendors'][T],
  undefined
>;

export interface OutputVendorConfigBase {
  active: boolean;
}

export interface CsvConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  };
}

export interface JsonConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  };
}

export interface GoogleSheetsConfig extends OutputVendorConfigBase {
  options: {
    credentials: Auth.Credentials;
    // credentials: string;
    spreadsheetId: string;
  };
}

export interface YnabConfig extends OutputVendorConfigBase {
  options: {
    accessToken: string;
    accountNumbersToYnabAccountIds: Record<string, string>;
    budgetId: string;
    maxPayeeNameLength?: number;
  };
}

export interface AccountToScrapeConfig {
  id: string;
  key: CompanyTypes;
  name: string;
  loginFields: Record<string, string>;
  active?: boolean;
}

export enum CompanyTypes {
  HAPOALIM = 'hapoalim',
  HAPOALIM_BE_ONLINE = 'hapoalimBeOnline',
  BEINLEUMI = 'beinleumi',
  UNION = 'union',
  AMEX = 'amex',
  ISRACARD = 'isracard',
  VISACAL = 'visaCal',
  MAX = 'max',
  LEUMI_CARD = 'leumiCard',
  OTSAR_HAHAYAL = 'otsarHahayal',
  DISCOUNT = 'discount',
  MIZRAHI = 'mizrahi',
  LEUMI = 'leumi',
  MASSAD = 'massad',
  YAHAV = 'yahav',
  BEYAHAD_BISHVILHA = 'beyahadBishvilha',
  BEHATSDAA = 'behatsdaa',
  MERCANTILE = 'mercantile',
}

export enum AccountType {
  IMPORTER = 'Importer',
  EXPORTER = 'Exporter',
}

export enum AccountStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
  ERROR = 'error',
}

export class BudgetTrackingEvent {
  message: string;

  vendorId?: CompanyTypes | OutputVendorName;

  accountStatus?: AccountStatus;

  error?: Error;

  accountType?: AccountType;

  constructor({
    message,
    vendorId,
    error,
    accountType,
    accountStatus = AccountStatus.IN_PROGRESS,
  }: BudgetTrackingEvent) {
    this.message = message;
    this.vendorId = vendorId;
    this.error = error;
    this.accountType = accountType;
    this.accountStatus = accountStatus;
  }
}

export class DownalodChromeEvent extends BudgetTrackingEvent {
  percent: number;

  constructor(percent: number) {
    super({ message: `Download Chrome: ${percent}%` });
    this.percent = percent;
  }
}

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export interface ExporterEvent extends BudgetTrackingEvent {
  allTransactions: EnrichedTransaction[];
}

export interface ExporterEndEvent extends ExporterEvent {
  exportedTransactionsNum: number;
}

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// End of common types
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Log {
  message: string;
  originalEvent?: BudgetTrackingEvent;
}

export interface Account {
  id: string;
  companyId: CompanyTypes | OutputVendorName;
  displayName: string;
  logo: string;
  type: AccountType;
  active: boolean;
  status?: AccountStatus;
  logs: Log[];
}

export interface Importer extends Account {
  loginFields: Record<string, string>;
}

export interface Exporter extends Account {
  options: object;
}

export interface AccountMetadata {
  companyId: string;
  companyName: string;
  logo: string;
}

export enum ModalStatus {
  IMPORTER_SETTINGS,
  EXPORTER_SETTINGS,
  LOGS,
  HIDDEN,
  NEW_SCRAPER,
  GENERAL_SETTINGS,
}

export enum ExporterResultType {
  WEBSITE_URL,
  FILE,
}

export interface ExportResultMetadata {
  resultType: ExporterResultType;
  getResultUri(exporter: OutputVendorConfigBase): string;
}
export type YnabFinancialAccount = Pick<YnabAccount, 'id' | 'name' | 'type'> & {
  budgetId: string;
  active: boolean;
};
export interface YnabAccountDetails {
  budgets: BudgetSummary[];
  accounts: YnabFinancialAccount[];
  categories?: string[];
}
export interface FinancialAccountDetails {
  name: string;
  accountNumber: string;
}
export enum FETCH_YNAB_ACCOUNT_DATA_STATUS {
  SUCCESS = 'SUCCESS',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
  INVALID_BUDGET_ID = 'INVALID_BUDGET_ID',
  GENERAL_ERROR = 'GENERAL_ERROR',
}
export interface YnabAccountDataType {
  ynabAccountData?: YnabAccountDetails;
  financialAccountDetails?: FinancialAccountDetails[];
  status: FETCH_YNAB_ACCOUNT_DATA_STATUS;
}
