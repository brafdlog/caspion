import { randomHex } from '@/modules/encryption/crypto';
import {
  AccountToScrapeConfig, Config, OutputVendorsConfig, OutputVendorsNames
} from '@/originalBudgetTrackingApp/configManager/configManager';
import defaultConfig from '@/originalBudgetTrackingApp/configManager/defaultConfig';
import { defineModule } from 'direct-vuex';
import { moduleActionContext } from '..';

type GlobalConfig = {
  numDaysBack: number,
  showBrowser: boolean
}

type ExporterPayload<T extends OutputVendorsNames> = { name: T, exporter: OutputVendorsConfig<T> }

const configModule = defineModule({
  namespaced: true as true,
  state: defaultConfig,
  mutations: {
    addImporter: (state: Config, importer: AccountToScrapeConfig) => state.scraping.accountsToScrape.push(importer),
    removeImporter: (state: Config, importerId: string) => {
      state.scraping.accountsToScrape = state.scraping.accountsToScrape.filter((importer) => importer.id !== importerId);
    },
    updateExporter: <T extends OutputVendorsNames>(state: Config, payload: ExporterPayload<T>) => {
      state.outputVendors[payload.name] = payload.exporter;
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
    getExporter: <T extends OutputVendorsNames>(state) => (name: T): OutputVendorsConfig<T> => state.outputVendors[name],
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
    updateExporter: <T extends OutputVendorsNames>(context, payload: ExporterPayload<T>) => {
      configModuleActionContext(context).commit.updateExporter(payload);
    },
    updateGlobalConfig: ({ commit }, globalConfig: GlobalConfig) => {
      commit('updateGlobalConfig', globalConfig);
    }
  },
});

export default configModule;

const configModuleActionContext = (context: any) => moduleActionContext(context, configModule);
