import { openExternal, openItem, updateConfig } from '#preload';
import { autorun, makeAutoObservable, toJS } from 'mobx';
import { createContext, useContext } from 'react';
import accountMetadata, { exporterUIHandlers } from '../accountMetadata';
import {
  AccountStatus,
  type AccountToScrapeConfig,
  AccountType,
  type BudgetTrackingEvent,
  type CompanyTypes,
  type Exporter,
  ExporterResultType,
  type Log,
  type OutputVendorName,
  type Account,
  type Config,
  type Importer,
} from '../types';

interface AccountScrapingData { logs: Log[]; status: AccountStatus }

const createAccountToScrapeConfigFromImporter = (
  importerConfig: Importer,
): AccountToScrapeConfig => ({
  id: importerConfig.id,
  active: importerConfig.active,
  key: importerConfig.companyId as CompanyTypes,
  loginFields: importerConfig.loginFields,
  name: importerConfig.displayName,
});

const createOutputVendorConfigFromExporter = (exporterConfig: Exporter) => ({
  active: exporterConfig.active,
  options: exporterConfig.options,
});

const createAccountObject = (
  id: string,
  companyId: keyof typeof accountMetadata,
  type: AccountType,
  active: boolean,
  accountScrapingData?: AccountScrapingData,
): Account => {
  const metadata = accountMetadata[companyId];
  if (!metadata) {
    throw new Error(`No metadata found for companyId ${companyId}`);
  }
  return {
    id,
    companyId,
    displayName: metadata.companyName,
    logo: metadata.logo,
    type,
    active,
    status: accountScrapingData?.status ?? AccountStatus.IDLE,
    logs: accountScrapingData?.logs ?? [],
  };
};

const saveConfigIntoFile = (config?: Config) => {
  if (!config) {
    console.warn(`Can't save config into file. Config is ${config}`);
    return;
  }
  updateConfig(toJS(config));
};

class ConfigStore {
  config: Config;

  chromeDownloadPercent = 0;

  // TODO: move this to a separate store
  accountScrapingData: Map<CompanyTypes | OutputVendorName, AccountScrapingData>;

  constructor() {
    this.accountScrapingData = new Map();
    makeAutoObservable(this);

    autorun(() => {
      saveConfigIntoFile(this.config);
    });
  }

  updateConfig(config: Config) {
    this.config = config;
  }

  get importers(): Importer[] {
    if (!this.config) return [];
    return this.config.scraping.accountsToScrape.map(({ id, key, active, loginFields }) => {
      return {
        ...createAccountObject(
          id,
          key,
          AccountType.IMPORTER,
          !!active,
          this.accountScrapingData.get(key),
        ),
        loginFields,
      };
    });
  }

  get exporters(): Exporter[] {
    if (!this.config) return [];
    return Object.entries(this.config.outputVendors).map(([exporterKey, exporter]) => {
      return {
        ...createAccountObject(
          exporterKey,
          exporterKey as OutputVendorName,
          AccountType.EXPORTER,
          !!exporter?.active,
          this.accountScrapingData.get(exporterKey as OutputVendorName),
        ),
        options: exporter?.options || {},
      };
    });
  }

  get isScraping(): boolean {
    return !!Array.from(this.accountScrapingData.values()).find(
      account => account.status === AccountStatus.IN_PROGRESS,
    );
  }

  get settings() {
    return {
      numDaysBack: this.config?.scraping.numDaysBack,
      showBrowser: this.config?.scraping.showBrowser,
    };
  }

  clearScrapingStatus() {
    this.accountScrapingData = new Map();
    this.updateChromeDownloadPercent(0);
  }

  updateChromeDownloadPercent(percent: number) {
    this.chromeDownloadPercent = percent;
  }

  // TODO: not need to be in a store
  openResults(exporterName: OutputVendorName) {
    const exporterConfig = this.config.outputVendors[exporterName];
    if (!exporterConfig) {
      throw new Error(`No exporter found for ${exporterName}`);
    }
    const { resultType, getResultUri } = exporterUIHandlers[exporterName];
    const uri = getResultUri(exporterConfig);
    if (resultType === ExporterResultType.WEBSITE_URL) {
      openExternal(uri);
    } else {
      openItem(uri);
    }
  }

  handleScrapingEvent(eventName: string, budgetTrackingEvent?: BudgetTrackingEvent) {
    console.log('Received scraping event', eventName, budgetTrackingEvent);
    if (eventName === 'DOWNLOAD_CHROME') {
      this.updateChromeDownloadPercent((budgetTrackingEvent as DownalodChromeEvent)?.percent);
    }
    if (budgetTrackingEvent) {
      const accountId = budgetTrackingEvent.vendorId;
      if (accountId) {
        if (!this.accountScrapingData.has(accountId)) {
          this.accountScrapingData.set(accountId, {
            logs: [],
            status: AccountStatus.IDLE,
          });
        }
        const accountScrapingData = this.accountScrapingData.get(accountId);
        if (accountScrapingData) {
          accountScrapingData.logs.push({
            message: budgetTrackingEvent.message,
            originalEvent: budgetTrackingEvent,
          });
          accountScrapingData.status = budgetTrackingEvent.accountStatus ?? AccountStatus.IDLE;
        }
      }
    }
  }

  async addImporter(importerConfig: Importer) {
    if (!accountMetadata[importerConfig.companyId]) {
      throw new Error(`Company id ${importerConfig.companyId} is not a valid company id`);
    }
    const accountToScrapeConfig: AccountToScrapeConfig =
      createAccountToScrapeConfigFromImporter(importerConfig);
    this.config.scraping.accountsToScrape.push(accountToScrapeConfig);
  }

  async updateImporter(id: string, updatedImporterConfig: Importer) {
    const importerIndex = this.config.scraping.accountsToScrape.findIndex(
      importer => importer.id === id,
    );
    if (importerIndex === -1) {
      throw new Error(`Cant update importer with id ${id}. No importer with that id found`);
    }
    this.config.scraping.accountsToScrape[importerIndex] =
      createAccountToScrapeConfigFromImporter(updatedImporterConfig);
  }

  async deleteImporter(id: string) {
    this.config.scraping.accountsToScrape = this.config.scraping.accountsToScrape.filter(
      importer => importer.id !== id,
    );
  }

  async updateExporter(updatedExporterConfig: Exporter) {
    this.config.outputVendors[updatedExporterConfig.companyId as OutputVendorName] =
      createOutputVendorConfigFromExporter(updatedExporterConfig);
  }

  async toggleShowBrowser() {
    this.config.scraping.showBrowser = !this.config.scraping.showBrowser;
  }

  async setNumDaysBack(numDaysBack: number) {
    this.config.scraping.numDaysBack = numDaysBack;
  }

  async setTimeout(timeout: number) {
    this.config.scraping.timeout = timeout;
  }

  async setMaxConcurrency(maxConcurrency: number) {
    this.config.scraping.maxConcurrency = maxConcurrency;
  }

  async setChromiumPath(chromiumPath?: string) {
    this.config.scraping.chromiumPath = chromiumPath;
  }
}

export const configStore = new ConfigStore();
const StoreContext = createContext<ConfigStore>(configStore);
export const ConfigStoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={configStore}>{children}</StoreContext.Provider>
);
export const useConfigStore = () => useContext(StoreContext);
