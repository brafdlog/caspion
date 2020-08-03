import { Transaction } from '@/originalBudgetTrackingApp/bankScraper';

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}
