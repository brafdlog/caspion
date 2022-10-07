import { FETCH_YNAB_ACCOUNT_DATA_STATUS, OutputVendorName, YnabAccountDataType } from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails, isAccessTokenValid } from '@/backend/export/outputVendors/ynab/ynab';
import { getFinancialAccountDetails } from '@/backend/import/importTransactions';
import { configFilePath } from '@/app-globals';

export async function getYnabAccountData(): Promise<YnabAccountDataType> {
  const config = await getConfig(configFilePath);

  const accessTokenValid = await isAccessTokenValid(config.outputVendors[OutputVendorName.YNAB]?.options?.accessToken);
  if (!accessTokenValid) {
    return {
      status: FETCH_YNAB_ACCOUNT_DATA_STATUS.INVALID_ACCESS_TOKEN
    };
  }
  const ynabAccountDataPromise = getYnabAccountDetails(config.outputVendors);
  const financialAccountDetailsPromise = getFinancialAccountDetails();
  const [ynabAccountData, financialAccountDetails] = await Promise.all([ynabAccountDataPromise, financialAccountDetailsPromise]);
  return {
    status: ynabAccountData.categories ? FETCH_YNAB_ACCOUNT_DATA_STATUS.SUCCESS : FETCH_YNAB_ACCOUNT_DATA_STATUS.INVALID_BUDGET_ID,
    ynabAccountData,
    financialAccountDetails
  };
}
