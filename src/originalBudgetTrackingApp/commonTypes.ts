import { Config } from './configManager/configManager';
import { Transaction } from './bankScraper';

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export interface OutputVendor {
  name: string;
  init?: (config: Config) => Promise<void>;
  exportTransactions: (transactionsToCreate: EnrichedTransaction[], startDate: Date, config: Config) => Promise<any>;
  isActive: (config: Config) => boolean;
}
