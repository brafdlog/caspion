import { BudgetTrackingEventEmitter } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
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

export type ExportTransactionsParams = {
  transactionsToCreate: EnrichedTransaction[];
  startDate: Date;
  outputVendorsConfig: Config['outputVendors'];
  eventEmitter: BudgetTrackingEventEmitter
}

export interface OutputVendor {
  name: OutputVendorName;
  init?: (outputVendorsConfig: Config['outputVendors']) => Promise<void>;
  exportTransactions: ({
    transactionsToCreate, startDate, outputVendorsConfig, eventEmitter
  }: ExportTransactionsParams) => Promise<any>;
}
