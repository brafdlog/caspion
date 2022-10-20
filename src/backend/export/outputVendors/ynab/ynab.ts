import _ from 'lodash';
import moment from 'moment/moment';
import * as ynab from 'ynab';
import {
  EventNames, EventPublisher, ExporterEvent
} from '@/backend/eventEmitters/EventEmitter';
import {
  EnrichedTransaction,
  ExportTransactionsFunction,
  OutputVendor,
  OutputVendorName,
  Config,
  YnabConfig,
  YnabAccountDetails,
  YnabFinancialAccount
} from '@/backend/commonTypes';

const INITIAL_YNAB_ACCESS_TOKEN = 'AABB';
const YNAB_DATE_FORMAT = 'YYYY-MM-DD';
const NOW = moment();
const MIN_YNAB_ACCESS_TOKEN_LENGTH = 43;

const categoriesMap: Map<string, Pick<ynab.Category, 'id' | 'name' | 'category_group_id'>> = new Map();
const transactionsFromYnab: Map<Date, ynab.TransactionDetail[]> = new Map();

let ynabConfig: YnabConfig | undefined;
let ynabAPI: ynab.API | undefined;

export async function init(outputVendorsConfig: Config['outputVendors']) {
  ynabConfig = outputVendorsConfig.ynab;

  verifyYnabAccessTokenWasDefined();
  if (ynabConfig) {
    ynabAPI = new ynab.API(ynabConfig.options.accessToken);
  }
}

const createTransactions: ExportTransactionsFunction = async ({ transactionsToCreate, startDate }, eventPublisher) => {
  if (!ynabConfig) {
    throw new Error('Must call init before using ynab functions');
  }
  if (!categoriesMap.size) {
    await initCategories();
  }
  const transactionsFromFinancialAccount = transactionsToCreate.map(convertTransactionToYnabFormat);
  let transactionsThatDontExistInYnab = await filterOnlyTransactionsThatDontExistInYnabAlready(startDate, transactionsFromFinancialAccount);
  // Filter out transactions that are in the future
  transactionsThatDontExistInYnab = transactionsThatDontExistInYnab.filter((transaction) => moment(transaction.date, YNAB_DATE_FORMAT).isBefore(NOW));
  if (!transactionsThatDontExistInYnab.length) {
    await emitProgressEvent(eventPublisher, transactionsToCreate, 'All transactions already exist in ynab. Doing nothing.');
    return null;
  }
  await emitProgressEvent(eventPublisher, transactionsToCreate, `Creating ${transactionsThatDontExistInYnab.length} transactions in ynab`);
  try {
    const transactionCreationResult = await ynabAPI!.transactions.createTransactions(ynabConfig.options.budgetId, {
      transactions: transactionsThatDontExistInYnab
    });
    return transactionCreationResult;
  } catch (e) {
    await eventPublisher.emit(EventNames.EXPORTER_ERROR, new ExporterEvent({
      message: e.message, error: e, exporterName: ynabOutputVendor.name, allTransactions: transactionsToCreate
    }));
    throw e;
  }
};

function getTransactions(startDate: Date): Promise<ynab.TransactionsResponse> {
  return ynabAPI!.transactions.getTransactions(ynabConfig!.options.budgetId, moment(startDate).format(YNAB_DATE_FORMAT));
}

export function getPayeeName(transaction: EnrichedTransaction, payeeNameMaxLength: number = 50) {
  // Specific case for Bank Hapoalim - Where we can extract the payee name from the memo. Note the "." is added
  // from the israeli-bank-scrapers project, and not from the bank itself
  if (transaction.memo?.startsWith('לטובת') && transaction.memo.includes('עבור')) {
    return transaction.memo.slice(7, transaction.memo.indexOf('עבור') - 2);
  }
  return transaction.description.substring(0, payeeNameMaxLength);
}

function convertTransactionToYnabFormat(originalTransaction: EnrichedTransaction): ynab.SaveTransaction {
  const amount = Math.round(originalTransaction.chargedAmount * 1000);
  const date = convertTimestampToYnabDateFormat(originalTransaction);

  return {
    account_id: getYnabAccountIdByAccountNumberFromTransaction(originalTransaction.accountNumber),
    date, // "2019-01-17",
    amount,
    // "payee_id": "string",
    payee_name: getPayeeName(originalTransaction, ynabConfig!.options.maxPayeeNameLength),
    category_id: getYnabCategoryIdFromCategoryName(originalTransaction.category),
    memo: originalTransaction.memo,
    cleared: ynab.SaveTransaction.ClearedEnum.Cleared
    // "approved": true,
    // "flag_color": "red",
    // "import_id": buildImportId(originalTransaction.description, amount, date) // 'YNAB:[milliunit_amount]:[iso_date]:[occurrence]'
  };
}

function getYnabAccountIdByAccountNumberFromTransaction(transactionAccountNumber: string) : string {
  const ynabAccountId = ynabConfig!.options.accountNumbersToYnabAccountIds[transactionAccountNumber];
  if (!ynabAccountId) {
    throw new Error(`Unhandled account number ${transactionAccountNumber}`);
  }
  return ynabAccountId;
}

function convertTimestampToYnabDateFormat(originalTransaction: EnrichedTransaction): string {
  return moment(originalTransaction.date).format(YNAB_DATE_FORMAT); // 2018-12-29T22:00:00.000Z -> 2018-12-29
}

function getYnabCategoryIdFromCategoryName(categoryName?: string) {
  if (!categoryName) {
    return null;
  }
  const categoryToReturn = categoriesMap.get(categoryName);
  if (!categoryToReturn) {
    return null;
  }
  return categoryToReturn && categoryToReturn.id;
}

export async function initCategories() {
  const categories = await ynabAPI!.categories.getCategories(ynabConfig!.options.budgetId);
  categories.data.category_groups.forEach((categoryGroup) => {
    categoryGroup.categories
      .map((category) => ({
        id: category.id,
        name: category.name,
        category_group_id: category.category_group_id
      }))
      .forEach((category) => {
        categoriesMap.set(category.name, category);
      });
  });
}

async function filterOnlyTransactionsThatDontExistInYnabAlready(startDate: Date, transactionsFromFinancialAccounts: ynab.SaveTransaction[]) {
  let transactionsInYnabBeforeCreatingTheseTransactions: ynab.TransactionDetail[];
  if (transactionsFromYnab.has(startDate)) {
    // @ts-ignore
    transactionsInYnabBeforeCreatingTheseTransactions = transactionsFromYnab.get(startDate);
  } else {
    const transactionsFromYnabResponse = await getTransactions(startDate);
    transactionsInYnabBeforeCreatingTheseTransactions = transactionsFromYnabResponse.data.transactions;
    transactionsFromYnab.set(startDate, transactionsInYnabBeforeCreatingTheseTransactions);
  }
  const transactionsThatDontExistInYnab = transactionsFromFinancialAccounts.filter(
    (transactionToCheck) => !transactionsInYnabBeforeCreatingTheseTransactions.find(
      (existingTransaction) => isSameTransaction(transactionToCheck, existingTransaction)
    )
  );
  return transactionsThatDontExistInYnab;
}

export function isSameTransaction(transactionToCreate: ynab.SaveTransaction, transactionFromYnab: ynab.TransactionDetail) {
  const isATransferTransaction = !!transactionFromYnab.transfer_account_id;
  return (
    transactionToCreate.account_id === transactionFromYnab.account_id
    && transactionToCreate.date === transactionFromYnab.date
    && Math.abs(transactionToCreate.amount - transactionFromYnab.amount) < 1000
    // In a transfer transaction the payee name changes, but we still consider this the same transaction
    && (areStringsEqualIgnoreCaseAndWhitespace(transactionToCreate.payee_name, transactionFromYnab.payee_name) || isATransferTransaction)
  );
}

export function areStringsEqualIgnoreCaseAndWhitespace(str1: string | null | undefined = '', str2 : string | null | undefined = '') {
  const trimmedAndLowerCaseStr1 = str1 && normalizeWhitespace(str1.toLowerCase());
  const trimmedAndLowerCaseStr2 = str2 && normalizeWhitespace(str2.toLowerCase());

  return trimmedAndLowerCaseStr1 === trimmedAndLowerCaseStr2;
}

function normalizeWhitespace(str: string) {
  return str && str.trim().replace(/\s+/g, ' ');
}

function verifyYnabAccessTokenWasDefined() {
  if (ynabConfig!.options.accessToken === INITIAL_YNAB_ACCESS_TOKEN) {
    throw new Error('You need to set the ynab access token in the config');
  }
}

export async function getYnabAccountDetails(outputVendorsConfig: Config['outputVendors'], budgetIdToCheck: string): Promise<YnabAccountDetails> {
  await init(outputVendorsConfig);
  const { budgets, accounts } = await getBudgetsAndAccountsData();

  let categories: YnabAccountDetails['categories'];
  if (doesBudgetIdExistInYnab(budgetIdToCheck)) {
    categories = await getYnabCategories();
  } else {
    // eslint-disable-next-line
    console.warn(`Budget id ${budgetIdToCheck} doesn't exist in ynab`);
  }
  return {
    budgets,
    accounts,
    categories
  };
}

function doesBudgetIdExistInYnab(budgetIdToCheck, budgets?: ynab.BudgetSummary[]): boolean {
  if (!budgetIdToCheck) {
    return false;
  }
  return !!budgets && !!budgets.find((budget) => budget.id === budgetIdToCheck);
}

export async function getBudgets(accessToken): Promise<{ id: string; name: string; }[] | undefined> {
  const localYnabApi = new ynab.API(accessToken);
  const budgetsResponse = await localYnabApi.budgets.getBudgets();
  return budgetsResponse?.data.budgets.map((budget) => ({ id: budget.id, name: budget.name }));
}

export async function isAccessTokenValid(accessToken) {
  if (!accessToken || accessToken.length !== MIN_YNAB_ACCESS_TOKEN_LENGTH) {
    return false;
  }
  try {
    const localYnabApi = new ynab.API(accessToken);
    await localYnabApi.budgets.getBudgets();
    return true;
  } catch (e) {
    return false;
  }
}

async function getBudgetsAndAccountsData() {
  const budgetsResponse = await ynabAPI!.budgets.getBudgets();
  let { budgets } = budgetsResponse.data;
  budgets = budgets.map((budget) => ({ id: budget.id, name: budget.name }));
  const accounts: YnabFinancialAccount[] = [];
  await Promise.all(
    budgets.map(async (budget) => {
      const budgetAccountsResponse = await ynabAPI!.accounts.getAccounts(budget.id);
      const budgetAccounts = budgetAccountsResponse.data.accounts.map(({
        id, name, type, deleted, closed
      }) => ({
        id, name, type, budgetId: budget.id, active: !deleted && !closed
      }));
      accounts.push(...budgetAccounts);
    })
  );
  return {
    budgets,
    accounts
  };
}

async function getYnabCategories() {
  const categoriesResponse = await ynabAPI!.categories.getCategories(ynabConfig!.options.budgetId);
  const categories = _.flatMap(categoriesResponse.data.category_groups, (categoryGroup) => categoryGroup.categories);
  const categoryNames = categories.map((category) => category.name);
  return categoryNames;
}

async function emitProgressEvent(eventPublisher: EventPublisher, allTransactions: EnrichedTransaction[], message: string) {
  await eventPublisher.emit(EventNames.EXPORTER_PROGRESS, new ExporterEvent({ message, exporterName: ynabOutputVendor.name, allTransactions }));
}

export const ynabOutputVendor: OutputVendor = {
  name: OutputVendorName.YNAB,
  init,
  exportTransactions: createTransactions
};
