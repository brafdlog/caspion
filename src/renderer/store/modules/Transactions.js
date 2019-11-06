import { properties } from '../../modules/transactions';

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
  addTransactions(state, data) {
    if (!state.transactions) {
      state.transactions = [];
    }
    state.transactions.push(...data);
  },
};

const actions = {
  addTransactionsAction({ commit }, account) {
    console.log('addTransaction action');
    console.log(account);
    commit('addTransactions', account.txns);
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
