const ynab = require('ynab/dist/index');
const moment = require('moment/moment');
const config = require('../../config');

const YNAB_DATE_FORMAT = 'YYYY-MM-DD';
const DID_NOTHING_RESPONSE = [];
const NOW = moment();

const ynabConfig = config.outputVendors.ynab;

const PAYEE_NAME_MAX_LENGTH = ynabConfig.maxPayeeNameLength || 50;

const BUDGET_ID = ynabConfig.budgetId;
const ACCOUNT_NUMBER_TO_YNAB_ACCOUNT_ID = ynabConfig.accountNumbersToYnabAccountIds;

const categoriesMap = new Map();
const transactionsFromYnab = new Map();
const ynabAPI = new ynab.API(ynabConfig.accessToken);
// const importIdMap = new Map();

async function createTransactions(transactionsToCreate, startDate) {
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
    const transactionCreationResult = await ynabAPI.transactions.createTransactions(BUDGET_ID, {
      transactions: transactionsThatDontExistInYnab
    });
    return transactionCreationResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function getTransactions(startDate) {
  return ynabAPI.transactions.getTransactions(BUDGET_ID, moment(startDate).format(YNAB_DATE_FORMAT));
}

// function buildImportId(payeeName, amount, date) {
//   // The import Id length is maximum 36 chars. Limiting the payee name to make sure we don't exceed 36 chars in importId
//   const payeeNameShort = payeeName.substr(0, 14);
//   const importId = `${payeeNameShort}:${amount}:${date}`;
//   if (!importIdMap.has(importId)) {
//     importIdMap.set(importId, 0);
//   }
//   const occurance = importIdMap.get(importId) + 1;
//   importIdMap.set(importId, occurance);
//   return `${importId}:${occurance}`;
// }

function convertTransactionToYnabFormat(originalTransaction) {
  const amount = Math.round(originalTransaction.chargedAmount * 1000);
  const date = convertTimestampToYnabDateFormat(originalTransaction);
  return {
    account_id: getYnabAccountIdByAccountNumberFromTransaction(originalTransaction.accountNumber),
    date, // "2019-01-17",
    amount,
    // "payee_id": "string",
    payee_name: originalTransaction.description.substring(0, PAYEE_NAME_MAX_LENGTH),
    category_id: getYnabCategoryIdFromCategoryName(originalTransaction.category),
    memo: originalTransaction.memo,
    cleared: 'cleared'
    // "approved": true,
    // "flag_color": "red",
    // "import_id": buildImportId(originalTransaction.description, amount, date) // 'YNAB:[milliunit_amount]:[iso_date]:[occurrence]'
  };
}

function getYnabAccountIdByAccountNumberFromTransaction(transactionAccountNumber) {
  const ynabAccountId = ACCOUNT_NUMBER_TO_YNAB_ACCOUNT_ID[transactionAccountNumber];
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
  const categories = await ynabAPI.categories.getCategories(BUDGET_ID);
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

module.exports = {
  createTransactions,
  initCategories: initCategoriesMap,
  isSameTransaction,
  areStringsEqualIgnoreCaseAndWhitespace
};

// (async function() {
//   // const budgetsResponse = await ynabAPI.budgets.getBudgets();
//   // const budgets = budgetsResponse.data.budgets;
//   // for (let budget of budgets) {
//   //   console.log(`Budget Name: ${budget.name}`);
//   // }
//
//   const categories = await ynabAPI.categories.getCategories(BUDGET_ID);
//   console.log(categories);
//
//
// })();
