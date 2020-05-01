const _ = require('lodash');
const ynab = require('ynab/dist/index');
const moment = require('moment/moment');
const configManager = require('../../configManager');
const configExample = require('../../config-example');

const INITIAL_YNAB_ACCESS_TOKEN = configExample.outputVendors.ynab.accessToken;
const YNAB_DATE_FORMAT = 'YYYY-MM-DD';
const DID_NOTHING_RESPONSE = [];
const NOW = moment();

const categoriesMap = new Map();
const transactionsFromYnab = new Map();

let ynabConfig;
let ynabAPI;
let ynabAccountDetails;

async function init(config) {
  if (ynabConfig && ynabAPI) {
    console.log('Ynab already initialized, skipping');
    return;
  }

  if (!config) {
    config = await configManager.getConfig();
  }
  ynabConfig = config.outputVendors.ynab;

  if (!ynabConfig.active) {
    console.log('Ynab not enabled, skipping');
    return;
  }

  verifyYnabAccessTokenWasDefined();
  ynabAPI = new ynab.API(ynabConfig.accessToken);
}

async function createTransactions(transactionsToCreate, startDate) {
  if (!ynabConfig) {
    throw new Error('Must call init before using ynab functions');
  }
  if (!categoriesMap.size) {
    await initCategoriesMap();
  }
  const transactionsFromFinancialAccount = transactionsToCreate.map(convertTransactionToYnabFormat);
  let transactionsThatDontExistInYnab = await filterOnlyTransactionsThatDontExistInYnabAlready(startDate, transactionsFromFinancialAccount);
  // Filter out transactions that are in the future
  transactionsThatDontExistInYnab = transactionsThatDontExistInYnab.filter(transaction => moment(transaction.date, YNAB_DATE_FORMAT).isBefore(NOW));
  if (!transactionsThatDontExistInYnab.length) {
    console.log('All transactions already exist in ynab. Doing nothing.');
    return DID_NOTHING_RESPONSE;
  }
  console.log('Creating the following transactions in ynab: ', transactionsThatDontExistInYnab);
  try {
    const transactionCreationResult = await ynabAPI.transactions.createTransactions(ynabConfig.budgetId, {
      transactions: transactionsThatDontExistInYnab
    });
    return transactionCreationResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function getTransactions(startDate) {
  return ynabAPI.transactions.getTransactions(ynabConfig.budgetId, moment(startDate).format(YNAB_DATE_FORMAT));
}

function convertTransactionToYnabFormat(originalTransaction) {
  const payeeNameMaxLength = ynabConfig.maxPayeeNameLength || 50;
  const amount = Math.round(originalTransaction.chargedAmount * 1000);
  const date = convertTimestampToYnabDateFormat(originalTransaction);
  return {
    account_id: getYnabAccountIdByAccountNumberFromTransaction(originalTransaction.accountNumber),
    date, // "2019-01-17",
    amount,
    // "payee_id": "string",
    payee_name: originalTransaction.description.substring(0, payeeNameMaxLength),
    category_id: getYnabCategoryIdFromCategoryName(originalTransaction.category),
    memo: originalTransaction.memo,
    cleared: 'cleared'
    // "approved": true,
    // "flag_color": "red",
    // "import_id": buildImportId(originalTransaction.description, amount, date) // 'YNAB:[milliunit_amount]:[iso_date]:[occurrence]'
  };
}

function getYnabAccountIdByAccountNumberFromTransaction(transactionAccountNumber) {
  const ynabAccountId = ynabConfig.accountNumbersToYnabAccountIds[transactionAccountNumber];
  if (!ynabAccountId) {
    throw new Error(`Unhandled account number ${transactionAccountNumber}`);
  }
  return ynabAccountId;
}

function convertTimestampToYnabDateFormat(originalTransaction) {
  return moment(originalTransaction.date).format(YNAB_DATE_FORMAT); // 2018-12-29T22:00:00.000Z -> 2018-12-29
}

function getYnabCategoryIdFromCategoryName(categoryName) {
  const categoryToReturn = categoriesMap.get(categoryName);
  if (categoryName && !categoryToReturn) {
    const errorMessage = `No category for name ${categoryName}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return categoryToReturn && categoryToReturn.id;
}

async function initCategoriesMap() {
  const categories = await ynabAPI.categories.getCategories(ynabConfig.budgetId);
  categories.data.category_groups.forEach(categoryGroup => {
    categoryGroup.categories
      .map(category => ({
        id: category.id,
        name: category.name,
        category_group_id: category.category_group_id
      }))
      .forEach(category => {
        categoriesMap.set(category.name, category);
      });
  });
}

async function filterOnlyTransactionsThatDontExistInYnabAlready(startDate, transactionsFromFinancialAccounts) {
  let transactionsInYnabBeforeCreatingTheseTransactions;
  if (transactionsFromYnab.has(startDate)) {
    transactionsInYnabBeforeCreatingTheseTransactions = transactionsFromYnab.get(startDate);
  } else {
    const transactionsFromYnabResponse = await getTransactions(startDate);
    transactionsInYnabBeforeCreatingTheseTransactions = transactionsFromYnabResponse.data.transactions;
    transactionsFromYnab.set(startDate, transactionsInYnabBeforeCreatingTheseTransactions);
  }
  const transactionsThatDontExistInYnab = transactionsFromFinancialAccounts.filter(
    transactionToCheck =>
      !transactionsInYnabBeforeCreatingTheseTransactions.find(existingTransaction => isSameTransaction(transactionToCheck, existingTransaction))
  );
  return transactionsThatDontExistInYnab;
}

function isSameTransaction(transactionA, transactionB) {
  const isATransferTransaction = transactionA.transfer_account_id || transactionB.transfer_account_id;
  return (
    transactionA.account_id === transactionB.account_id &&
    transactionA.date === transactionB.date &&
    Math.abs(transactionA.amount - transactionB.amount) < 1000 &&
    // In a transfer transaction the payee name changes, but we still consider this the same transaction
    (areStringsEqualIgnoreCaseAndWhitespace(transactionA.payee_name, transactionB.payee_name) || isATransferTransaction)
  );
}

function areStringsEqualIgnoreCaseAndWhitespace(str1 = '', str2 = '') {
  const trimmedAndLowerCaseStr1 = str1 && normalizeWhitespace(str1.toLowerCase());
  const trimmedAndLowerCaseStr2 = str2 && normalizeWhitespace(str2.toLowerCase());

  return trimmedAndLowerCaseStr1 === trimmedAndLowerCaseStr2;
}

function normalizeWhitespace(str) {
  return str && str.trim().replace(/\s+/g, ' ');
}

function verifyYnabAccessTokenWasDefined() {
  if (ynabConfig.accessToken === INITIAL_YNAB_ACCESS_TOKEN) {
    throw new Error('You need to set the ynab access token in the config');
  }
}

async function getYnabAccountDetails() {
  if (!ynabAccountDetails) {
    await init();
    const { budgets, accounts } = await getBudgetsAndAccountsData();
    const categoryNames = await getYnabCategories();
    ynabAccountDetails = {
      budgets,
      accounts,
      categories: categoryNames
    };
  }
  return ynabAccountDetails;
}

async function getBudgetsAndAccountsData() {
  const budgetsResponse = await ynabAPI.budgets.getBudgets();
  let budgets = budgetsResponse.data.budgets;
  budgets = budgets.map(budget => ({ id: budget.id, name: budget.name }));
  const accounts = [];
  await Promise.all(
    budgets.map(async budget => {
      const budgetAccountsResponse = await ynabAPI.accounts.getAccounts(budget.id);
      const budgetAccounts = budgetAccountsResponse.data.accounts.map(({ id, name, type }) => ({ id, name, type, budgetName: budget.name }));
      accounts.push(...budgetAccounts);
    })
  );
  return {
    budgets,
    accounts
  };
}

async function getYnabCategories() {
  const categoriesResponse = await ynabAPI.categories.getCategories(ynabConfig.budgetId);
  const categories = _.flatMap(categoriesResponse.data.category_groups, categoryGroup => categoryGroup.categories);
  const categoryNames = categories.map(category => category.name);
  return categoryNames;
}

module.exports = {
  init,
  createTransactions,
  initCategories: initCategoriesMap,
  isSameTransaction,
  areStringsEqualIgnoreCaseAndWhitespace,
  getYnabAccountDetails
};
