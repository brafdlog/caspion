import { EventPublisher } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import { Config, OutputVendorName } from './configManager/configManager';
import { Transaction } from './import/bankScraper';

export { OutputVendorName };

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export type ExportTransactionsParams = {
  transactionsToCreate: EnrichedTransaction[];
  startDate: Date;
  outputVendorsConfig: Config['outputVendors'];
}

export type ExportTransactionsFunction = (
  exportTransactionsParams: ExportTransactionsParams,
  eventPublisher: EventPublisher
) => Promise<any>;

export interface OutputVendor {
  name: OutputVendorName;
  init?: (outputVendorsConfig: Config['outputVendors']) => Promise<void>;
  exportTransactions: ExportTransactionsFunction;
}
