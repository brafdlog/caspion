const state = {
  transactions: [],
  properties: [
    {
      // can be either 'normal' or 'installments'
      name: 'type',
      title: 'Type',
    },
    {
      // only if exists
      name: 'identifier',
      title: 'Identifier',
    },
    {
      // ISO date string
      name: 'date',
      title: 'Date',
      column: true,
    },
    {
      // ISO date string
      name: 'processedDate',
      title: 'Processed Date',
    },
    {
      name: 'originalAmount',
      title: 'Original Amount',
    },
    {
      name: 'originalCurrency',
      title: 'Original Currency',
    },
    {
      name: 'chargedAmount',
      title: 'Charged Amount',
      column: true,
    },
    {
      name: 'description',
      title: 'Description',
      column: true,
    },
    {
      // can be null or empty
      name: 'memo',
      title: 'Memo',
    },
    {
      // the current installment number
      name: 'number',
      title: 'Installments Number',
    },
    {
      // the total number of installments
      name: 'total',
      title: 'Installments Total',
    },
    {
      // can either be 'completed' or 'pending'
      name: 'status',
      title: 'Status',
    },
  ],
};

const getters = {
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
