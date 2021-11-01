import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { updateConfig } from "./eventsBridge";
import {
  Account,
  AccountStatus,
  AccountToScrapeConfig,
  AccountType,
  BudgetTrackingEvent,
  Config,
  Importer,
  Log
} from './types';
import accountMetadata from './accountMetadata';

export default class Store {
  config?: Config;
  accountScrapingData: Map<string, { logs: Log[], status: AccountStatus }>;

  constructor() {
    this.accountScrapingData = new Map();
    makeAutoObservable(this, {
      handleScrapingEvent: action,
      addImporter: action,
      updateImporter: action,
      deleteImporter: action
    });
  }

  set configuration(config: Config) {
    this.config = config;
  }

  get importers(): Importer[] {
    if (!this.config) return [];
    return this.config.scraping.accountsToScrape.map(accountToScrape => {
      return {
        ...this.createAccountObject(accountToScrape.id, accountToScrape.key, AccountType.IMPORTER, accountToScrape.active),
        loginFields: accountToScrape.loginFields
      };
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
        if (accountScrapingData) {
          accountScrapingData.logs.push({message: budgetTrackingEvent.message});
          accountScrapingData.status = budgetTrackingEvent.accountStatus;
        }
      }
    }
  }

  createAccountObject(id: string, companyId: string, type: AccountType, active: boolean): Account {
    const metadata = accountMetadata[companyId];
    if (!metadata) {
      throw new Error(`No metadata found for companyId ${companyId}`);
    }
      const accountScrapingData = this.accountScrapingData.get(companyId);
      return {
        id,
        companyId,
        displayName: metadata.companyName,
        logo: metadata.logo,
        type,
        active,
        status: accountScrapingData ? accountScrapingData.status : AccountStatus.IDLE,
        logs: accountScrapingData ? accountScrapingData.logs : []
      };
  }

  async addImporter(importerConfig: Importer) {
    this.verifyConfigDefined();
    if (!accountMetadata[importerConfig.companyId]) {
      throw new Error(`Company id ${importerConfig.companyId} is not a valid company id`);
    }
    const accountToScrapeConfig: AccountToScrapeConfig = this.createAccountToScrapeConfigFromImporter(importerConfig);
    this.config.scraping.accountsToScrape.push(accountToScrapeConfig);
    await updateConfig(this.config);
  }

  async updateImporter(id: string, updatedImporterConfig: Importer) {
    this.verifyConfigDefined();
    const importerIndex = this.config.scraping.accountsToScrape.findIndex(importer => importer.id === id);
    if (importerIndex === -1) {
      throw new Error(`Cant update importer with id ${id}. No importer with that id found`);
    }
    this.config.scraping.accountsToScrape[importerIndex] = this.createAccountToScrapeConfigFromImporter(updatedImporterConfig);
    await updateConfig(this.config);
  }

  async deleteImporter(id: string) {
    this.verifyConfigDefined();
    this.config.scraping.accountsToScrape = this.config.scraping.accountsToScrape.filter(importer => importer.id !== id);
    await updateConfig(this.config);
  }

  createAccountToScrapeConfigFromImporter(importerConfig: Importer): AccountToScrapeConfig {
    return { id: importerConfig.id, active: importerConfig.active, key: importerConfig.companyId, loginFields: importerConfig.loginFields, name: importerConfig.displayName };
  }

  verifyConfigDefined() {
    if (!this.config) {
      throw new Error('Config not defined');
    }
  }

}

export const StoreContext = createContext<Store>(null);
