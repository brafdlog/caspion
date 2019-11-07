import { properties, getHash } from '../../modules/transactions';

const state = {
  transactions: {},
  properties,
};

const getters = {
  transactionsArray: (state) => Object.values(state.transactions),
  tableColumns: (state) => state.properties.filter((prop) => prop.column),
  propertiesColumns: (state) => state.properties.filter((prop) => !prop.column),
};

const mutations = {
  initTransactionIfNot(state) {
    if (!state.transactions) {
      state.transactions = {};
    }
  },
  addTransactions(state, transactions) {
    state.transactions = { ...state.transactions, ...transactions };
  },
};

const actions = {
  addTransactionsAction({ commit }, account) {
    commit('initTransactionIfNot');

    const transactionsObject = account.txns.reduce((prev, current) => {
      prev[getHash(current)] = current;
      return prev;
    }, {});
    commit('addTransactions', transactionsObject);
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
