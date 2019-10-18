import { LoadState, SetImporter } from '../../modules/jsonFileDB'

const mutations = {
  setImporters (state, data) {
    state.importers = data
  },
  addImporter (state, data) {
    state.importers.push(data)
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
  }
}

export default {
  state: {
    importers: []
  },
  mutations,
  actions
}
