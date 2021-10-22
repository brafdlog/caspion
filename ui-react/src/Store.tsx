import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Account, AccountStatus, AccountType, BudgetTrackingEvent, Config, Log } from './types';
import accountMetadata from './accountMetadata';

export default class Store {
  config?: Config;
  accountScrapingData: Map<string, { logs: Log[], status: AccountStatus }>;

  constructor() {
    this.accountScrapingData = new Map();
    makeAutoObservable(this, {
      handleScrapingEvent: action
    });
  }

  set configuration(config: Config) {
    this.config = config;
  }

  handleScrapingEvent(eventName: string, budgetTrackingEvent?: BudgetTrackingEvent) {
    if (budgetTrackingEvent) {
      const accountId = budgetTrackingEvent.vendorId;
      if (accountId) {
        if (!this.accountScrapingData.has(accountId)) {
          this.accountScrapingData.set(accountId, {
            logs: [],
            status: AccountStatus.IDLE
          });
        }
        const accountScrapingData = this.accountScrapingData.get(accountId);
        accountScrapingData.logs.push({ message: budgetTrackingEvent.message });
        accountScrapingData.status = budgetTrackingEvent.accountStatus;
      }
    }
  }

  get importers(): Account[] {
    if (!this.config) return [];
    return this.config.scraping.accountsToScrape.map(accountToScrape => {
      return this.createAccountObject(accountToScrape.id, accountToScrape.key, AccountType.IMPORTER, accountToScrape.active);
    });
  }

  get exporters(): Account[] {
    if (!this.config) return [];
    const outputVendors = this.config.outputVendors;
    return Object.keys(outputVendors).map(exporterKey => {
      const exporter = outputVendors[exporterKey];
      return this.createAccountObject(exporterKey, exporterKey, AccountType.EXPORTER, exporter.active);
    });
  }

  get allAccounts(): Account[] {
    const importers = this.importers;
    const exporters = this.exporters;
    return [
      ...importers,
      ...exporters
    ];
  }

  get allAccountsById(): Map<string, Account> {
    const accountsById = new Map<string, Account>();
    this.allAccounts.forEach(account => {
      accountsById.set(account.id, account);
    });
    return accountsById;
  }

  get settings() {
    return {
      numDaysBack: this.config?.scraping.numDaysBack,
      showBrowser: this.config?.scraping.showBrowser
    };
  }

  get isScraping(): boolean {
    return !!Array.from(this.accountScrapingData.values()).find(account => account.status === AccountStatus.IN_PROGRESS);
  }

  createAccountObject(id: string, companyId: string, type: AccountType, active: boolean): Account {
    const {
        companyName,
        logo
      } = accountMetadata[companyId];
      const accountData = this.accountScrapingData.get(companyId);
      return {
        id,
        companyId,
        displayName: companyName,
        logo,
        type,
        active,
        status: accountData ? accountData.status : AccountStatus.IDLE,
        logs: accountData ? accountData.logs : []
      };
  }
}

export const StoreContext = createContext<Store>(null);
