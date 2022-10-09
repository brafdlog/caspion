/* eslint-disable no-console */
import { configFilePath } from '@/app-globals';
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails } from '@/backend/export/outputVendors/ynab/ynab';
import { getFinancialAccountNumbers } from '@/backend/import/importTransactions';
import { app } from 'electron';

export async function printYnabAccountData() {
  const config = await getConfig(configFilePath(app));
  const ynabAccountData = await getYnabAccountDetails(config.outputVendors);
  const companyIdToAccountNumbers = await getFinancialAccountNumbers(config);
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
