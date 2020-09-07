import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import _ from 'lodash';
import outputVendors from '@/originalBudgetTrackingApp/export/outputVendors';

export async function createTransactionsInExternalVendors(config: Config, companyIdToTransactions: Record<string, EnrichedTransaction[]>, startDate: Date) {
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  for (let j = 0; j < outputVendors.length; j++) {
    const outputVendor = outputVendors[j];
    if (config.outputVendors[outputVendor.name]?.active) {
      await outputVendor.init?.(config);
      console.log(`Start creating transactions in ${outputVendor.name}`);
      const vendorResult = await outputVendor.exportTransactions(allTransactions, startDate, config);
      console.log(`Finished creating transactions in ${outputVendor.name}`);
      executionResult[outputVendor.name] = vendorResult;
    }
  }
  if (!Object.keys(executionResult).length) {
    throw new Error('You need to set at least one output vendor to be active');
  }
  return executionResult;
}
