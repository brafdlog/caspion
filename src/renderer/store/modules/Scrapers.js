import { SCRAPERS } from 'israeli-bank-scrapers-core';

const state = {
  scrapers: SCRAPERS,
};

const getters = {
  scrapersWithId: (state) => Object.keys(state.scrapers)
    .map((k) => ({ key: k, ...state.scrapers[k] })),
};

export default {
  state,
  getters,
};
