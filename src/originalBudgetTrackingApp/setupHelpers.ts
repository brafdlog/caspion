import _ from 'lodash';
import moment from 'moment';
import * as configManager from '@/originalBudgetTrackingApp/configManager/configManager';
import { scrapeFinancialAccountsAndFetchTransactions } from '@/originalBudgetTrackingApp/import/importTransactions';
import { getYnabAccountDetails } from './export/outputVendors/ynab/ynab';

export async function printYnabAccountData() {
  const ynabAccountData = await getYnabAccountDetails();
  const companyIdToAccountNumbers = await getFinancialAccountNumbers();
  console.log();
  console.log();
  console.log('------YNAB Budgets------');
  console.log(ynabAccountData.budgets);
  console.log();
  console.log('------YNAB Accounts------');
  console.log(ynabAccountData.accounts);
  console.log();
  console.log('------Financial institutions account numbers------');
  console.log(companyIdToAccountNumbers);
  console.log();
}

async function getFinancialAccountNumbers() {
  const config = await configManager.getConfig();

  const startDate = moment()
    .subtract(30, 'days')
    .startOf('day')
    .toDate();

  console.log('Fetching data from financial institutions to determine the account numbers');
  const companyIdToTransactions = await scrapeFinancialAccountsAndFetchTransactions(config, startDate);
  const companyIdToAccountNumbers: Record<string, string[]> = {};
  Object.keys(companyIdToTransactions).forEach((companyId) => {
    let accountNumbers = companyIdToTransactions[companyId].map((transaction) => transaction.accountNumber);
    accountNumbers = _.uniq(accountNumbers);
    companyIdToAccountNumbers[companyId] = accountNumbers;
  });
  return companyIdToAccountNumbers;
}
