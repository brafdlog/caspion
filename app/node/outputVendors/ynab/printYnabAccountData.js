const { getYnabAccountDetails } = require('./ynab');

async function printYnabAccountData() {
  const ynabAccountData = await getYnabAccountDetails();
  const allAccounts = ynabAccountData.budgets.flatMap(budget => budget.accounts);
  ynabAccountData.accounts = allAccounts;
  console.log('------Budgets------');
  console.log(ynabAccountData.budgets);
  console.log();
  console.log('------Accounts------');
  console.log(ynabAccountData.accounts);
  console.log();
  console.log('------Expense categories------');
  console.log(ynabAccountData.categories);
  console.log();
}

printYnabAccountData();
