import { AddTransactions } from '../../modules/jsonFileDB';

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
    AddTransactions(account.txns, (txns) => {
      console.log('action callback');
      console.log(txns);
      commit('addTransactions', txns);
    });
  },
};


export default {
  state,
  mutations,
  actions,
};
