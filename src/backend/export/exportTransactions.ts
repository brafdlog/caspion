import _ from 'lodash';
import {
  AccountStatus, EventNames, EventPublisher, ExporterEndEvent, ExporterEvent
} from '@/backend/eventEmitters/EventEmitter';
import { EnrichedTransaction, Config } from '@/backend/commonTypes';
import outputVendors from '@/backend/export/outputVendors';

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date, eventPublisher: EventPublisher
) {
  await eventPublisher.emit(EventNames.EXPORT_PROCESS_START);
  const executionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  const exportPromises = outputVendors
    .filter((outputVendor) => outputVendorsConfig[outputVendor.name]?.active)
    .map(async (outputVendor) => {
      const baseEvent = {
        exporterName: outputVendor.name,
        allTransactions
      };

      await outputVendor.init?.(outputVendorsConfig);
      await eventPublisher.emit(EventNames.EXPORTER_START, new ExporterEvent({ message: 'Starting', ...baseEvent }));
      try {
        const exportTransactionsResult = await outputVendor.exportTransactions({
          transactionsToCreate: allTransactions, startDate, outputVendorsConfig
        }, eventPublisher);
        await eventPublisher.emit(EventNames.EXPORTER_END, new ExporterEndEvent({
          message: 'Finished',
          ...baseEvent,
          status: AccountStatus.DONE,
          exportedTransactionsNum: exportTransactionsResult.exportedTransactionsNum
        }));
        executionResult[outputVendor.name] = exportTransactionsResult;
      } catch (e) {
        await eventPublisher.emit(EventNames.EXPORTER_ERROR, new ExporterEvent({
          message: e.message, error: e, ...baseEvent
        }));
        throw e;
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
