import { randomHex } from '@/modules/encryption/crypto';

export const ADD_IMPORTER_ACTION = 'ADD_IMPORTER_ACTION';
export const REMOVE_IMPORTER_ACTION = 'REMOVE_IMPORTER_ACTION';
export const GET_IMPORTERS_GETTER = 'GET_IMPORTERS_GETTER';

const state = {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: []
  },
  outputVendors: {},
  monitoring: {}
};

const mutations = {
  addImporter: (state, importer) => {
    state.scraping.accountsToScrape.push(importer);
  },
  removeImporter(state, importerId) {
    state.scraping.accountsToScrape = state.scraping.accountsToScrape.filter((importer) => importer.id !== importerId);
  },
};

// TODO not sure we need that. We need a status but not in the state
const emptyStatusObj = {
  success: null,
  lastMessage: null,
};

const getters = {
  [GET_IMPORTERS_GETTER]: (state) => state.scraping.accountsToScrape.map((account) => {
    account.status = account.status || { ...emptyStatusObj };
    return account;
  })
};

const actions = {
  [ADD_IMPORTER_ACTION]: ({ commit }, importer) => {
    importer.id = randomHex();
    commit('addImporter', importer);
  },
  [REMOVE_IMPORTER_ACTION]: ({ commit }, importerId) => {
    commit('removeImporter', importerId);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
