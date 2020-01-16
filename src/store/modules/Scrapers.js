const state = {
  scrapers: [],
};

const mutations = {
  setScraper(state, scrapers) {
    state.scrapers = scrapers;
  },
};

export const getters = {
  scrapersWithId: (state) => Object.keys(state.scrapers)
    .map((k) => ({ key: k, ...state.scrapers[k] })),
};

const actions = {
  set_scraper({ commit }, scrapers) {
    commit('setScraper', scrapers);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
