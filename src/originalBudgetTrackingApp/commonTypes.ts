import { Transaction } from '@/originalBudgetTrackingApp/bankScraper';
import { CompanyTypes } from '@brafdlog/israeli-bank-scrapers-core';

export interface ProgressEmitter {
  onProgress(func: (...args: any[]) => void): void
}

export interface EnrichedTransaction extends Transaction {
  accountNumber: string;
  category?: string;
  hash: string;
}

export interface ScrapingEvents {
  status: (status: string, data?: { name?: string, [other: string]: any }) => void,
  progress: (...args: any[]) => void,
  error: (message: string, data?: { companyId?: CompanyTypes, error?: Error, [other: string]: any }) => void,
  finish: (data?: { companyId?: CompanyTypes, accountId?: string, [other: string]: any }) => void
}

export interface ScrapingEventEmitter {
  on<U extends keyof ScrapingEvents>(
    event: U, listener: ScrapingEvents[U]
  ): this;

  emit<U extends keyof ScrapingEvents>(
    event: U, ...args: Parameters<ScrapingEvents[U]>
  ): boolean;

  listenTo(emitter: ProgressEmitter): void
}
