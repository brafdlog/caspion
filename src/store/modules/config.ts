import { randomHex } from '@/modules/encryption/crypto';
import { AccountToScrapeConfig, Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import defaultConfig from '@/originalBudgetTrackingApp/configManager/defaultConfig';
import { defineModule } from 'direct-vuex';

type GlobalConfig = {
  numDaysBack: number,
  showBrowser: boolean
}

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
    importersWithStatus: (state) => {
      const importers = state.scraping.accountsToScrape.map((importer) => {
        const status = {};
        return { ...importer, status };
      });
      return importers;
    },
    getExporter: (state) => (name: string) => state.outputVendors[name],
    globalConfig: ({ scraping }): GlobalConfig => {
      const { numDaysBack, showBrowser } = scraping;
      return { numDaysBack, showBrowser };
    }
  },
  actions: {
    addImporter: ({ commit }, importer) => {
      importer.id = randomHex();
      commit('addImporter', importer);
    },
    removeImporter: ({ commit }, importerId) => {
      commit('removeImporter', importerId);
    },
    addExporter: ({ commit }, { name, ...values }) => {
      commit('addExporter', { name, ...values });
    },
    updateGlobalConfig: ({ commit }, globalConfig: GlobalConfig) => {
      commit('updateGlobalConfig', globalConfig);
    }
  },
});
