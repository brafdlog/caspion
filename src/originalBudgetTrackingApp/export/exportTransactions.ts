import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { BudgetTrackingEventEmitter, EventNames } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import _ from 'lodash';
import outputVendors from '@/originalBudgetTrackingApp/export/outputVendors';

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date, eventEmitter: BudgetTrackingEventEmitter
) {
  await eventEmitter.emit(EventNames.EXPORT_PROCESS_START);
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  for (let j = 0; j < outputVendors.length; j++) {
    const outputVendor = outputVendors[j];
    if (outputVendorsConfig[outputVendor.name]?.active) {
      const baseExporterEventData = { name: outputVendor.name.toString(), allTransactions };

      await outputVendor.init?.(outputVendorsConfig);
      await eventEmitter.emit(EventNames.EXPORTER_START, baseExporterEventData);
      try {
        const vendorResult = await outputVendor.exportTransactions({
          transactionsToCreate: allTransactions, startDate, outputVendorsConfig, eventEmitter
        });
        await eventEmitter.emit(EventNames.EXPORTER_END, baseExporterEventData);
        executionResult[outputVendor.name] = vendorResult;
      } catch (e) {
        await eventEmitter.emit(EventNames.EXPORTER_ERROR, { ...baseExporterEventData, error: e });
        throw e;
      }
    }
  }
  if (!Object.keys(executionResult).length) {
    const error = new Error('You need to set at least one output vendor to be active');
    throw error;
  }

  await eventEmitter.emit(EventNames.EXPORT_PROCESS_END);
  return executionResult;
}
