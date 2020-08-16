import { randomHex } from '@/modules/encryption/crypto';
import { Config, AccountToScrapeConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import defaultConfig from '@/originalBudgetTrackingApp/configManager/defaultConfig';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

export const ADD_IMPORTER_ACTION = 'ADD_IMPORTER_ACTION';
export const ADD_EXPORTER_ACTION = 'ADD_EXPORTER_ACTION';
export const REMOVE_IMPORTER_ACTION = 'REMOVE_IMPORTER_ACTION';
export const GET_IMPORTERS_GETTER = 'GET_IMPORTERS_GETTER';
export const GET_EXPORTER_GETTER = 'GET_EXPORTER_GETTER';
export const GLOBAL_CONFIG_GETTER = 'GLOBAL_CONFIG_GETTER';
export const UPDATE_GLOBAL_CONFIG_ACTION = 'UPDATE_GLOBAL_CONFIG_ACTION';

const state: Config = defaultConfig;

const mutations = <MutationTree<Config>>{
  addImporter: (state: Config, importer: AccountToScrapeConfig) => state.accountsToScrape.push(importer),
  removeImporter: (state: Config, importerId: string) => {
    state.accountsToScrape = state.accountsToScrape.filter((importer) => importer.id !== importerId);
  },
  addExporter: (state: Config, { name, ...values }) => {
    state.outputVendors[name] = values;
  },
  updateGlobalConfig: (state: Config, updatedConfig) => {
    state.globalConfig = updatedConfig
  }
};

const getters = <GetterTree<Config, any>>{
  [GET_IMPORTERS_GETTER]: (state) => {
    const importers = state.accountsToScrape.map((importer) => {
      const status = {};
      return { ...importer, status };
    });
    return importers;
  },
  [GET_EXPORTER_GETTER]: (state) => (name: string) => state.outputVendors[name],
  [GLOBAL_CONFIG_GETTER]: ({ globalConfig }) => globalConfig
};

const actions = <ActionTree<Config, any>>{
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
  [UPDATE_GLOBAL_CONFIG_ACTION]: ({ commit }, globalConfig) => {
    commit('updateGlobalConfig', globalConfig)
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
};
