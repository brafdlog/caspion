const state = {
  transactions: [],
  defaultColumns: {
    type: 'Type', // can be either 'normal' or 'installments'
    identifier: 'Identifier', // only if exists
    date: 'Date', // ISO date string
    processedDate: 'Processed Date', // ISO date string
    originalAmount: 'Original Amount',
    originalCurrency: 'Original Currency',
    chargedAmount: 'Charged Amount',
    description: 'Description',
    memo: 'Memo', // can be null or empty
    number: 'Installments Number', // the current installment number
    total: 'Installments Total', // the total number of installments
    status: 'Status', // can either be 'completed' or 'pending'
  },
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
  mutations,
  actions,
};
