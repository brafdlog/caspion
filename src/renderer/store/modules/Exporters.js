const state = {
  JsonExporter: {

  },
};

const mutations = {
  setProperties(state, { name, properties }) {
    state[name] = properties;
  },
};

const actions = {
  saveExporterProperties({ commit }, payload) {
    if (!payload.name) throw new Error('The payload must include a \'name\' property');
    if (!payload.properties) throw new Error('The payload must include a \'properties\' property');
    commit('setProperties', payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
