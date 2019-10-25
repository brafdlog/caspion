import { LoadState, SetImporter, RemoveImporter } from '../../modules/jsonFileDB'

const mutations = {
  setImporters (state, data) {
    state.importers = data
  },
  addImporter (state, data) {
    state.importers.push(data)
  },
  removeImporter (state, data) {
    state.importers = state.importers.filter(importer => importer._id !== data)
  }
}

const actions = {
  loadImporters ({ commit }) {
    LoadState(result => {
      commit('setImporters', result)
    })
  },
  addImporterAction ({ commit }, importer) {
    SetImporter(importer, importer => {
      commit('addImporter', importer)
    })
  },
  removeImporterAction ({ commit }, importerId) {
    RemoveImporter(importerId, () => {
      commit('removeImporter', importerId)
    })
  }
}

export default {
  state: {
    importers: []
  },
  mutations,
  actions
}
