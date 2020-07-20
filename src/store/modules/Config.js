import { randomHex } from '@/modules/encryption/crypto';
// import defaultConfig from '@/originalBudgetTrackingApp/configManager/defaultConfig';

export const ADD_IMPORTER_ACTION = 'ADD_IMPORTER_ACTION';
export const ADD_EXPORTER_ACTION = 'ADD_EXPORTER_ACTION';
export const REMOVE_IMPORTER_ACTION = 'REMOVE_IMPORTER_ACTION';
export const GET_IMPORTERS_GETTER = 'GET_IMPORTERS_GETTER';
export const GET_EXPORTER_GETTER = 'GET_EXPORTER_GETTER';

const state = {};

const mutations = {
  addImporter: (state, importer) => state.scraping.accountsToScrape.push(importer),
  removeImporter: (state, importerId) => {
    state.scraping.accountsToScrape = state.scraping.accountsToScrape.filter((importer) => importer.id !== importerId);
  },
  addExporter: (state, { name, ...values }) => {
    state.outputVendors[name] = values;
  },
};

const getters = {
  [GET_IMPORTERS_GETTER]: (state) => {
    const importers = state.scraping.accountsToScrape.map((importer) => {
      const status = importer.status ? importer.status : {};
      return { ...importer, status };
    });
    return importers;
  },
  [GET_EXPORTER_GETTER]: (state) => (name) => state.outputVendors[name]
};

const actions = {
  [ADD_IMPORTER_ACTION]: ({ commit }, importer) => {
    importer.id = randomHex();
    commit('addImporter', importer);
  },
  [REMOVE_IMPORTER_ACTION]: ({ commit }, importerId) => {
    commit('removeImporter', importerId);
  },
  [ADD_EXPORTER_ACTION]: ({ commit }, { name, ...values }) => {
    commit('addExporter', { name, ...values });
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
};
