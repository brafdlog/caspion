import { getConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { getYnabAccountDetails } from '@/originalBudgetTrackingApp/export/outputVendors/ynab/ynab';
import { getFinancialAccountNumbers } from '@/originalBudgetTrackingApp/import/importTransactions';

export async function printYnabAccountData() {
  const config = await getConfig();
  const ynabAccountData = await getYnabAccountDetails(config.outputVendors);
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
