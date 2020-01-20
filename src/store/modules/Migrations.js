const state = {
  last: 0,
};

const mutations = {
  update(state, data) {
    state.last = data;
  },
};

const actions = {
  updateLast({ commit }, payload) {
    commit('update', parseInt(payload, 10));
  },
};

export default {
  state,
  mutations,
  actions,
};
