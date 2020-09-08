import { randomHex } from '@/modules/encryption/crypto';
import { AccountToScrapeConfig, Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import defaultConfig from '@/originalBudgetTrackingApp/configManager/defaultConfig';
import { defineModule } from 'direct-vuex';

type GlobalConfig = {
  numDaysBack: number,
  showBrowser: boolean
}

export const ADD_IMPORTER_ACTION = 'ADD_IMPORTER_ACTION';
export const ADD_EXPORTER_ACTION = 'ADD_EXPORTER_ACTION';
export const REMOVE_IMPORTER_ACTION = 'REMOVE_IMPORTER_ACTION';
export const GET_IMPORTERS_GETTER = 'GET_IMPORTERS_GETTER';
export const GET_EXPORTER_GETTER = 'GET_EXPORTER_GETTER';
export const GLOBAL_CONFIG_GETTER = 'GLOBAL_CONFIG_GETTER';
export const UPDATE_GLOBAL_CONFIG_ACTION = 'UPDATE_GLOBAL_CONFIG_ACTION';

export default defineModule({
  namespaced: true as true,
  state: defaultConfig,
  mutations: {
    addImporter: (state: Config, importer: AccountToScrapeConfig) => state.scraping.accountsToScrape.push(importer),
    removeImporter: (state: Config, importerId: string) => {
      state.scraping.accountsToScrape = state.scraping.accountsToScrape.filter((importer) => importer.id !== importerId);
    },
    addExporter: (state: Config, { name, ...values }) => {
      state.outputVendors[name] = values;
    },
    updateGlobalConfig: (state: Config, updatedConfig: GlobalConfig) => {
      state.scraping.numDaysBack = updatedConfig.numDaysBack;
      state.scraping.showBrowser = updatedConfig.showBrowser;
    }
  },
  getters: {
    [GET_IMPORTERS_GETTER]: (state) => {
      const importers = state.scraping.accountsToScrape.map((importer) => {
        const status = {};
        return { ...importer, status };
      });
      return importers;
    },
    [GET_EXPORTER_GETTER]: (state) => (name: string) => state.outputVendors[name],
    [GLOBAL_CONFIG_GETTER]: ({ scraping }): GlobalConfig => {
      const { numDaysBack, showBrowser } = scraping;
      return { numDaysBack, showBrowser };
    }
  },
  actions: {
    [ADD_IMPORTER_ACTION]: ({ commit }, importer) => {
      importer.id = randomHex();
      commit('addImporter', importer);
    },
    [REMOVE_IMPORTER_ACTION]: ({ commit }, importerId) => {
      commit('removeImporter', importerId);
    },
    [ADD_EXPORTER_ACTION]: ({ commit }, { name, ...values }) => {
      commit('addExporter', { name, ...values });
    },
    [UPDATE_GLOBAL_CONFIG_ACTION]: ({ commit }, globalConfig: GlobalConfig) => {
      commit('updateGlobalConfig', globalConfig);
    }
  },
});
