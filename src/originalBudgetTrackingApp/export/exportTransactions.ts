import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction, ScrapingEventEmitter } from '@/originalBudgetTrackingApp/commonTypes';
import _ from 'lodash';
import outputVendors from '@/originalBudgetTrackingApp/export/outputVendors';

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date, eventEmitter: ScrapingEventEmitter
) {
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  for (let j = 0; j < outputVendors.length; j++) {
    const outputVendor = outputVendors[j];
    if (outputVendorsConfig[outputVendor.name]?.active) {
      await outputVendor.init?.(outputVendorsConfig);
      eventEmitter.emit('status', 'Start creating transactions', { name: outputVendor.name });
      const vendorResult = await outputVendor.exportTransactions(allTransactions, startDate, outputVendorsConfig);
      eventEmitter.emit('finish', { name: outputVendor.name });
      executionResult[outputVendor.name] = vendorResult;
    }
  }
  if (!Object.keys(executionResult).length) {
    const error = new Error('You need to set at least one output vendor to be active');
    eventEmitter.emit('error', error.message, { error });
    throw error;
  }
  return executionResult;
}
