/* eslint-disable no-console */
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails } from '@/backend/export/outputVendors/ynab/ynab';
import { getFinancialAccountDetails } from '@/backend/import/importTransactions';

export async function getYnabAccountData() {
  const config = await getConfig();
  const ynabAccountDataPromise = getYnabAccountDetails(config.outputVendors);
  const financialAccountDetailsPromise = getFinancialAccountDetails();
  const [ynabAccountData, financialAccountDetails] = await Promise.all([ynabAccountDataPromise, financialAccountDetailsPromise]);
  return {
    ynabAccountData,
    financialAccountDetails
  };
}
