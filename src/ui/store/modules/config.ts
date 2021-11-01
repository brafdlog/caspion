import { defineModule } from 'direct-vuex';
import { randomHex } from '@/backend/configManager/encryption/crypto';
import {
  AccountToScrapeConfig, Config, OutputVendorConfig, OutputVendorName
} from '@/backend/configManager/configManager';
import { moduleActionContext } from '../index';

export type GlobalConfig = {
  numDaysBack: number,
  showBrowser: boolean
}

type ExporterPayload<T extends OutputVendorName> = { name: T, exporter: OutputVendorConfig<T> }

const configModule = defineModule({
  namespaced: true as true,
  mutations: {
    addImporter: (state: Config, importer: AccountToScrapeConfig) => state.scraping.accountsToScrape.push(importer),
    removeImporter: (state: Config, importerId: string) => {
      state.scraping.accountsToScrape = state.scraping.accountsToScrape.filter((importer) => importer.id !== importerId);
    },
    updateExporter: <T extends OutputVendorName>(state: Config, payload: ExporterPayload<T>) => {
      state.outputVendors[payload.name] = payload.exporter;
    },
    updateGlobalConfig: (state: Config, updatedConfig: GlobalConfig) => {
      state.scraping.numDaysBack = updatedConfig.numDaysBack;
      state.scraping.showBrowser = updatedConfig.showBrowser;
    }
  },
  getters: {
    importers: (state) => state.scraping.accountsToScrape,
    getExporter: <T extends OutputVendorName>(state) => (name: T): OutputVendorConfig<T> => state.outputVendors[name],
    globalConfig: ({ scraping }): GlobalConfig => {
      const { numDaysBack, showBrowser } = scraping;
      return { numDaysBack, showBrowser };
    },
    getActiveImporters: (state) => {
      return state.scraping.accountsToScrape
        .filter((accountToScrape) => accountToScrape.active)
        .map((accountToScrape) => ({ id: accountToScrape.key, name: accountToScrape.name }));
    },
    getActiveExporters: (state) => {
      const activeExporters: { id: string, name: string }[] = [];
      Object.entries(state.outputVendors).forEach(([outputVendorName, outputVendorConfig]) => {
        if (outputVendorConfig?.active) {
          activeExporters.push({ id: outputVendorName, name: outputVendorName });
        }
      });
      return activeExporters;
    },
    getState: (state) => state
  },
  actions: {
    addImporter: ({ commit }, importer) => {
      importer.id = randomHex();
      commit('addImporter', importer);
    },
    removeImporter: ({ commit }, importerId) => {
      commit('removeImporter', importerId);
    },
    updateExporter: <T extends OutputVendorName>(context, payload: ExporterPayload<T>) => {
      configModuleActionContext(context).commit.updateExporter(payload);
    },
    updateGlobalConfig: ({ commit }, globalConfig: GlobalConfig) => {
      commit('updateGlobalConfig', globalConfig);
    }
  },
});

export default configModule;

const configModuleActionContext = (context: any) => moduleActionContext(context, configModule);
