import { randomHex } from '../../modules/encryption/crypto';

const mutations = {
  addImporter(state, data) {
    state.importers.push(data);
  },
  removeImporter(state, data) {
    state.importers = state.importers.filter((importer) => importer.key !== data);
  },
};

const actions = {
  addImporterAction({ commit }, importer) {
    importer.id = randomHex();
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
