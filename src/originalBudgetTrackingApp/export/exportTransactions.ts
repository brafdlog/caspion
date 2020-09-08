import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import _ from 'lodash';
import outputVendors from '@/originalBudgetTrackingApp/export/outputVendors';

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date
) {
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  for (let j = 0; j < outputVendors.length; j++) {
    const outputVendor = outputVendors[j];
    if (outputVendorsConfig[outputVendor.name]?.active) {
      await outputVendor.init?.(outputVendorsConfig);
      console.log(`Start creating transactions in ${outputVendor.name}`);
      const vendorResult = await outputVendor.exportTransactions(allTransactions, startDate, outputVendorsConfig);
      console.log(`Finished creating transactions in ${outputVendor.name}`);
      executionResult[outputVendor.name] = vendorResult;
    }
  }
  if (!Object.keys(executionResult).length) {
    throw new Error('You need to set at least one output vendor to be active');
  }
  return executionResult;
}
