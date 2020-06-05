import { randomHex } from '@/modules/encryption/crypto';

const mutations = {
  addImporter(state, data) {
    state.importers.push(data);
  },
  removeImporter(state, data) {
    state.importers = state.importers.filter((importer) => importer.id !== data);
  },
  updateStatus(state, { id, status }) {
    state.importers = state.importers.map((importer) => {
      if (importer.id === id) {
        importer.status = status;
      }
      return importer;
    });
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
  updateImporterStatus({ commit }, { id, status }) {
    commit('updateStatus', { id, status });
  },
};

const emptyStatusObj = {
  success: null,
  lastMessage: null,
};

const getters = {
  importers: (state) => state.importers.map((importer) => {
    importer.status = importer.status || { ...emptyStatusObj };
    return importer;
  }),
};

export default {
  state: {
    importers: [],
  },
  mutations,
  actions,
  getters,
};
