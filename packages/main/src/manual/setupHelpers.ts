/* eslint-disable no-console */
import { type YnabConfig, type YnabAccountDataType } from '@/backend/commonTypes';
import { FETCH_YNAB_ACCOUNT_DATA_STATUS } from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails, isAccessTokenValid } from '@/backend/export/outputVendors/ynab/ynab';
// import { getFinancialAccountDetails } from '@/backend/import/importTransactions';

export async function getYnabAccountData(_: unknown, ynabOptions: YnabConfig['options']): Promise<YnabAccountDataType> {
  const config = await getConfig();

  const accessTokenValid = await isAccessTokenValid(ynabOptions.accessToken);
  if (!accessTokenValid) {
    return {
      status: FETCH_YNAB_ACCOUNT_DATA_STATUS.INVALID_ACCESS_TOKEN,
    };
  }
  // const ynabAccountDataPromise = getYnabAccountDetails(config.outputVendors);
  // const financialAccountDetailsPromise = getFinancialAccountDetails();
  // const [ynabAccountData, financialAccountDetails] = await Promise.all([ynabAccountDataPromise, financialAccountDetailsPromise]);
  const ynabAccountData = await getYnabAccountDetails(config.outputVendors, ynabOptions.budgetId, ynabOptions.accessToken);
  // const financialAccountDetails = [];

  return {
    status: ynabAccountData.categories ? FETCH_YNAB_ACCOUNT_DATA_STATUS.SUCCESS : FETCH_YNAB_ACCOUNT_DATA_STATUS.INVALID_BUDGET_ID,
    ynabAccountData,
    // financialAccountDetails
  };
}
