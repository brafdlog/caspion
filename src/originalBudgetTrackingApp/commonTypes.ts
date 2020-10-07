import { EventPublisher } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import { Config, OutputVendorConfig, OutputVendorName } from './configManager/configManager';
import { Transaction } from './import/bankScraper';

export { OutputVendorName };

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export type ExportTransactionsParams<T extends OutputVendorName> = {
  transactionsToCreate: EnrichedTransaction[];
  startDate: Date;
  outputVendorsConfig: OutputVendorConfig<T>;
}

export type ExportTransactionsFunction<T extends OutputVendorName> = (
  exportTransactionsParams: ExportTransactionsParams<T>,
  eventPublisher: EventPublisher
) => Promise<any>;

export interface OutputVendor<T extends OutputVendorName> {
  name: T;
  init?: (outputVendorsConfig: Config['outputVendors']) => Promise<void>;
  exportTransactions: ExportTransactionsFunction<T>;
}
