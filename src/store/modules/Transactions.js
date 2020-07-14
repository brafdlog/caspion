import { properties, transactionArrayToObject } from '../../modules/transactions';

const state = {
  transactions: {},
  properties,
};

const getters = {
  transactionsArray: (state) => Object.values(state.transactions),
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

    const transactionsObject = transactionArrayToObject(account.txns);
    commit('addTransactions', transactionsObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
