const state = {
  transactions: [],
};

const mutations = {
  addTransactions(state, data) {
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
  mutations,
  actions,
};
