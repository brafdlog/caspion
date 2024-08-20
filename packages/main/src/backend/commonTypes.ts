import { type CompanyTypes, type ScraperCredentials } from 'israeli-bank-scrapers-core';
import { type Transaction } from 'israeli-bank-scrapers-core/lib/transactions';
import { type Account, type BudgetSummary } from 'ynab';
import { type EventPublisher } from './eventEmitters/EventEmitter';
import { type Credentials } from './export/outputVendors/googleSheets/googleSheetsInternalAPI';

export type { ScraperScrapingResult } from 'israeli-bank-scrapers-core';
export type {
  Credentials,
  OAuth2Client,
  Spreadsheet,
} from './export/outputVendors/googleSheets/googleSheetsInternalAPI';
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
    timeout: number;
  };
  useReactUI?: boolean;
}

export enum OutputVendorName {
  YNAB = 'ynab',
  GOOGLE_SHEETS = 'googleSheets',
  JSON = 'json',
  CSV = 'csv',
}

export type OutputVendorConfigs = Exclude<
  Config['outputVendors'][OutputVendorName],
  undefined
>;
export type OutputVendorConfig<T extends OutputVendorName> = Exclude<
  Config['outputVendors'][T],
  undefined
>;

interface OutputVendorConfigBase {
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
    credentials: Credentials;
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
  loginFields: ScraperCredentials;
  active?: boolean;
}

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export interface ExportTransactionsParams {
  transactionsToCreate: EnrichedTransaction[];
  startDate: Date;
  outputVendorsConfig: Config['outputVendors'];
}

export interface ExportTransactionsResult {
  exportedTransactionsNum: number;
}

export type ExportTransactionsFunction = (
  exportTransactionsParams: ExportTransactionsParams,
  eventPublisher: EventPublisher,
) => Promise<ExportTransactionsResult>;

export interface OutputVendor {
  name: OutputVendorName;
  init?: (outputVendorsConfig: Config['outputVendors']) => Promise<void>;
  exportTransactions: ExportTransactionsFunction;
}

export interface FinancialAccountDetails {
  name: string;
  accountNumber: string;
}

export type YnabFinancialAccount = Pick<Account, 'id' | 'name' | 'type'> & {
  budgetId: string;
  active: boolean;
};

export enum FETCH_YNAB_ACCOUNT_DATA_STATUS {
  SUCCESS = 'SUCCESS',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
  INVALID_BUDGET_ID = 'INVALID_BUDGET_ID',
  GENERAL_ERROR = 'GENERAL_ERROR',
}

export interface YnabAccountDetails {
  budgets: BudgetSummary[];
  accounts: YnabFinancialAccount[];
  categories?: string[];
}

export interface YnabAccountDataType {
  ynabAccountData?: YnabAccountDetails;
  financialAccountDetails?: FinancialAccountDetails[];
  status: FETCH_YNAB_ACCOUNT_DATA_STATUS;
}
