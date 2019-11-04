const state = {
  transactions: [],
  allColumns: {
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

const unwrapTableColumns = ({ date, chargedAmount, description }) => (
  { date, chargedAmount, description }
);

const unwrapPropertiesColumns = ({
  type, identifier, processedDate, originalAmount, originalCurrency, memo, status,
}) => (
  {
    type, identifier, processedDate, originalAmount, originalCurrency, memo, status,
  }
);

const getters = {
  tableColumns: (state) => unwrapTableColumns(state.allColumns),
  propertiesColumns: (state) => unwrapPropertiesColumns(state.allColumns),
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
