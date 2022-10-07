import { FinancialAccountDetails, OutputVendorName, YnabAccountDetails } from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import { getYnabAccountDetails, isAccessTokenValid } from '@/backend/export/outputVendors/ynab/ynab';
import { getFinancialAccountDetails } from '@/backend/import/importTransactions';
import { configFilePath } from '@/app-globals';

export enum STATUS {
  SUCCESS = 'SUCCESS',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
  INVALID_BUDGET_ID = 'INVALID_BUDGET_ID',
  GENERAL_ERROR = 'GENERAL_ERROR'
}

type YNAB_ACCOUNTS_DATA = { ynabAccountData?: YnabAccountDetails, financialAccountDetails?: FinancialAccountDetails[], status: STATUS };

export async function getYnabAccountData(): Promise<YNAB_ACCOUNTS_DATA> {
  const config = await getConfig(configFilePath);

  const accessTokenValid = await isAccessTokenValid(config.outputVendors[OutputVendorName.YNAB]?.options?.accessToken);
  if (!accessTokenValid) {
    return {
      status: STATUS.INVALID_ACCESS_TOKEN
    };
  }
  const ynabAccountDataPromise = getYnabAccountDetails(config.outputVendors);
  const financialAccountDetailsPromise = getFinancialAccountDetails();
  const [ynabAccountData, financialAccountDetails] = await Promise.all([ynabAccountDataPromise, financialAccountDetailsPromise]);
  return {
    status: ynabAccountData.categories ? STATUS.SUCCESS : STATUS.INVALID_BUDGET_ID,
    ynabAccountData,
    financialAccountDetails
  };
}
