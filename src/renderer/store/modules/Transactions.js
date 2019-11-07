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
  addTransaction(state, key, txn) {
    if (!state.transactions[key]) {
      state.transactions[key] = txn;
    }
  },
};

const actions = {
  addTransactionsAction({ commit }, account) {
    commit('initTransactionIfNot');

    account.txns.forEach((txn) => {
      const key = getHash(txn);
      commit('addTransaction', key, txn);
    });
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
