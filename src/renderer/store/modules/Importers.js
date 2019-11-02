const mutations = {
  setImporters(state, data) {
    state.importers = data;
  },
  addImporter(state, data) {
    state.importers.push(data);
  },
  removeImporter(state, data) {
    state.importers = state.importers.filter((importer) => importer._id !== data);
  },
};

const actions = {
  addImporterAction({ commit }, importer) {
    commit('addImporter', importer);
  },
  removeImporterAction({ commit }, importerId) {
    commit('removeImporter', importerId);
  },
};

export default {
  state: {
    importers: [],
  },
  mutations,
  actions,
};
