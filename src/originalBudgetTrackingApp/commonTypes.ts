import { Transaction } from './import/bankScraper';
import { Config } from './configManager/configManager';

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
  init?: (outputVendorsConfig: Config['outputVendors']) => Promise<void>;
  exportTransactions: (transactionsToCreate: EnrichedTransaction[], startDate: Date, outputVendorConfig: Config['outputVendors']) => Promise<any>;
}
