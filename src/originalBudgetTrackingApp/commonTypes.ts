import { Transaction } from './flow/scrape';
import { Config } from './configManager/configTypes';

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export enum OutputVendorName {
  YNAB = 'ynab',
  GOOGLE_SHEETS = 'googleSheets'
}

export interface OutputVendor {
  name: OutputVendorName;
  init?: (config: Config) => Promise<void>;
  exportTransactions: (transactionsToCreate: EnrichedTransaction[], startDate: Date, config: Config) => Promise<any>;
}
