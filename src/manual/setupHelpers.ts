import { YnabConfig } from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails } from '@/backend/export/outputVendors/ynab/ynab';
import { getFinancialAccountDetails } from '@/backend/import/importTransactions';
import { configFilePath } from '@/app-globals';

export async function getYnabAccountData(overrideYnabConfig?: YnabConfig) {
  const config = await getConfig(configFilePath);
  if (overrideYnabConfig) {
    config.outputVendors = { ...config.outputVendors, ynab: overrideYnabConfig };
  }
  const ynabAccountDataPromise = getYnabAccountDetails(config.outputVendors);
  const financialAccountDetailsPromise = getFinancialAccountDetails();
  const [ynabAccountData, financialAccountDetails] = await Promise.all([ynabAccountDataPromise, financialAccountDetailsPromise]);
  return {
    ynabAccountData,
    financialAccountDetails
  };
}
