export const ADD_IMPORTER_ACTION = 'ADD_IMPORTER_ACTION';

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
  }
};

const actions = {
  [ADD_IMPORTER_ACTION]: ({ commit }, importer) => {
    commit('addImporter', importer);
  }
};

export default {
  state,
  mutations,
  actions,
};
