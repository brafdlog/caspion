/* eslint-disable no-console */
import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import {
  updateConfig, getYnabAccountData, openItem, openExternal
} from './eventsBridge';
import {
  Account,
  AccountStatus,
  AccountToScrapeConfig,
  AccountType,
  AppInfo,
  BudgetTrackingEvent,
  Config,
  Exporter,
  Importer,
  Log,
  OutputVendorName
} from './types';
import accountMetadata from './accountMetadata';
import { YnabAccountDataType, YnabConfig } from '../../src/backend/commonTypes';

export default class Store {
  config?: Config;

  accountScrapingData: Map<string, { logs: Log[], status: AccountStatus }>;

  ynabAccountData?: YnabAccountDataType;

  fetchingYnabAccountData: boolean;

  appInfo: AppInfo;

  constructor() {
    this.accountScrapingData = new Map();
    this.fetchingYnabAccountData = false;
    makeAutoObservable(this, {
      handleScrapingEvent: action,
      addImporter: action,
      updateImporter: action,
      deleteImporter: action,
      clearScrapingStatus: action,
      fetchYnabAccountData: action,
      toggleShowBrowser: action,
      setNumDaysBack: action
    });
  }

setOpenResultsFunction =() => {

  if (this.config === undefined || !this.config.outputVendors) return;

  const {
    csv, json, ynab, googleSheets
  } = this.config.outputVendors;

  if (csv) {
    csv.openResults = () => {
      openItem(csv.options.filePath);
    };
  }

  if (json) {
    json.openResults = () => {
      openItem(json.options.filePath);
    };
  }

  if (ynab) {
    ynab.openResults = () => {
      openExternal('https://app.youneedabudget.com/'); // todo: set specific url
    };
  }

  if (googleSheets) {
    googleSheets.openResults = () => {
      openExternal(`https://docs.google.com/spreadsheets/d/${googleSheets.options.spreadsheetId}/edit`);
    };
  }
}

set configuration(config: Config) {
  this.config = config;
  this.setOpenResultsFunction();
}

get importers(): Importer[] {
  if (!this.config) return [];
  return this.config.scraping.accountsToScrape.map((accountToScrape) => {
    return {
      ...this.createAccountObject(accountToScrape.id, accountToScrape.key, AccountType.IMPORTER, accountToScrape.active),
      loginFields: accountToScrape.loginFields
    };
  });
}

get exporters(): Exporter[] {
  if (!this.config) return [];
  const { outputVendors } = this.config;
  return Object.keys(outputVendors).map((exporterKey) => {
    const exporter = outputVendors[exporterKey];
    return {
      ...this.createAccountObject(exporterKey, exporterKey, AccountType.EXPORTER, exporter.active),
      options: exporter.options
    };
  });
}

get allAccounts(): Account[] {
  const { importers } = this;
  const { exporters } = this;
  return [
    ...importers,
    ...exporters
  ];
}

get allAccountsById(): Map<string, Account> {
  const accountsById = new Map<string, Account>();
  this.allAccounts.forEach((account) => {
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
  return !!Array.from(this.accountScrapingData.values()).find((account) => account.status === AccountStatus.IN_PROGRESS);
}

clearScrapingStatus() {
  this.accountScrapingData = new Map();
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
        accountScrapingData.logs.push({ message: budgetTrackingEvent.message, originalEvent: budgetTrackingEvent });
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
  const accountToScrapeConfig: AccountToScrapeConfig = createAccountToScrapeConfigFromImporter(importerConfig);
  this.config.scraping.accountsToScrape.push(accountToScrapeConfig);
  await updateConfig(this.config);
}

async updateImporter(id: string, updatedImporterConfig: Importer) {
  this.verifyConfigDefined();
  const importerIndex = this.config.scraping.accountsToScrape.findIndex((importer) => importer.id === id);
  if (importerIndex === -1) {
    throw new Error(`Cant update importer with id ${id}. No importer with that id found`);
  }
  this.config.scraping.accountsToScrape[importerIndex] = createAccountToScrapeConfigFromImporter(updatedImporterConfig);
  await updateConfig(this.config);
}

async deleteImporter(id: string) {
  this.verifyConfigDefined();
  this.config.scraping.accountsToScrape = this.config.scraping.accountsToScrape.filter((importer) => importer.id !== id);
  await updateConfig(this.config);
}

async updateExporter(updatedExporterConfig: Exporter) {
  this.verifyConfigDefined();
  this.config.outputVendors[updatedExporterConfig.companyId] = createOutputVendorConfigFromExporter(updatedExporterConfig);
  await updateConfig(this.config);
}

verifyConfigDefined() {
  if (!this.config) {
    throw new Error('Config not defined');
  }
}

async toggleShowBrowser() {
  this.verifyConfigDefined();
  this.config.scraping.showBrowser = !this.config.scraping.showBrowser;
  await updateConfig(this.config);
}

async setNumDaysBack(numDaysBack: number) {
  this.verifyConfigDefined();
  this.config.scraping.numDaysBack = numDaysBack;
  await updateConfig(this.config);
}

async setTimeout(timeout: number) {
  this.verifyConfigDefined();
  this.config.scraping.timeout = timeout;
  await updateConfig(this.config);
}

async setMaxConcurrency(maxConcurrency: number) {
  this.verifyConfigDefined();
  this.config.scraping.maxConcurrency = maxConcurrency;
  await updateConfig(this.config);
}

async setChromiumPath(chromiumPath?: string) {
  this.verifyConfigDefined();
  this.config.scraping.chromiumPath = chromiumPath;
  await updateConfig(this.config);
}

async fetchYnabAccountData(ynabOptions: YnabConfig['options']) {
  console.log('Fetching ynab account data');
  this.fetchingYnabAccountData = true;
  this.ynabAccountData = await getYnabAccountData(ynabOptions);
  this.fetchingYnabAccountData = false;
  console.log('Ynab account data ', this.ynabAccountData);
}

}

const createAccountToScrapeConfigFromImporter = (importerConfig: Importer): AccountToScrapeConfig => ({
  id: importerConfig.id,
  active: importerConfig.active,
  key: importerConfig.companyId,
  loginFields: importerConfig.loginFields,
  name: importerConfig.displayName
});

const createOutputVendorConfigFromExporter = (exporterConfig: Exporter) => ({
  active: exporterConfig.active,
  options: exporterConfig.options
});

export const StoreContext = createContext<Store>(null);
