import { Config } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EventPublisher, EventNames } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import _ from 'lodash';
import outputVendors from '@/originalBudgetTrackingApp/export/outputVendors';

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date, eventPublisher: EventPublisher
) {
  await eventPublisher.emit(EventNames.EXPORT_PROCESS_START);
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  const exportPromises = outputVendors.map(async (outputVendor) => {
    if (outputVendorsConfig[outputVendor.name]?.active) {
      const baseExporterEventData = { name: outputVendor.name.toString(), allTransactions };

      await outputVendor.init?.(outputVendorsConfig);
      await eventPublisher.emit(EventNames.EXPORTER_START, baseExporterEventData);
      try {
        const vendorResult = await outputVendor.exportTransactions({
          transactionsToCreate: allTransactions, startDate, outputVendorsConfig
        }, eventPublisher);
        await eventPublisher.emit(EventNames.EXPORTER_END, baseExporterEventData);
        executionResult[outputVendor.name] = vendorResult;
      } catch (e) {
        await eventPublisher.emit(EventNames.EXPORTER_ERROR, { ...baseExporterEventData, error: e });
        throw e;
      }
    }
  });

  await Promise.all(exportPromises);
  if (!Object.keys(executionResult).length) {
    const error = new Error('You need to set at least one output vendor to be active');
    throw error;
  }

  await eventPublisher.emit(EventNames.EXPORT_PROCESS_END);
  return executionResult;
}
