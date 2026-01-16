import {
  type Config,
  type EnrichedTransaction,
  type ExportTransactionsResult,
  type OutputVendorName,
} from '@/backend/commonTypes';
import {
  AccountStatus,
  EventNames,
  ExporterEndEvent,
  ExporterEvent,
  type EventPublisher,
} from '@/backend/eventEmitters/EventEmitter';
import outputVendors from '@/backend/export/outputVendors';
import _ from 'lodash';
import { createOperationLogger, type OperationLogger } from '/@/logging/operationLogger';

type ExecutionResult = Partial<Record<OutputVendorName, ExportTransactionsResult>>;

export async function createTransactionsInExternalVendors(
  outputVendorsConfig: Config['outputVendors'],
  companyIdToTransactions: Record<string, EnrichedTransaction[]>,
  startDate: Date,
  eventPublisher: EventPublisher,
  opLog?: OperationLogger,
) {
  const log = opLog ?? createOperationLogger('export');

  await eventPublisher.emit(EventNames.EXPORT_PROCESS_START);
  const executionResult: ExecutionResult = {};
  const allTransactions = _.flatten(Object.values(companyIdToTransactions));

  const activeExporters = outputVendors.filter((outputVendor) => outputVendorsConfig[outputVendor.name]?.active);

  log.info('START', {
    exportersCount: activeExporters.length,
    exporters: activeExporters.map((e) => e.name).join(','),
    transactionsToExport: allTransactions.length,
    importersWithData: Object.keys(companyIdToTransactions).length,
  });

  if (activeExporters.length === 0) {
    const error = new Error('You need to set at least one output vendor to be active');
    log.error('NO_ACTIVE_EXPORTERS', error);
    throw error;
  }

  let successCount = 0;
  let failedCount = 0;
  let totalExported = 0;

  const exportPromises = activeExporters.map(async (outputVendor) => {
    const exporterStartTime = Date.now();
    const baseEvent = {
      exporterName: outputVendor.name,
      allTransactions,
    };

    log.info('EXPORTER_START', { exporter: outputVendor.name });

    await outputVendor.init?.(outputVendorsConfig);
    await eventPublisher.emit(EventNames.EXPORTER_START, new ExporterEvent({ message: 'Starting', ...baseEvent }));
    try {
      const exportTransactionsResult = await outputVendor.exportTransactions(
        {
          transactionsToCreate: allTransactions,
          startDate,
          outputVendorsConfig,
        },
        eventPublisher,
      );

      log.info('EXPORTER_SUCCESS', {
        exporter: outputVendor.name,
        exported: exportTransactionsResult.exportedTransactionsNum,
        skipped: allTransactions.length - exportTransactionsResult.exportedTransactionsNum,
        duration: `${Date.now() - exporterStartTime}ms`,
      });

      await eventPublisher.emit(
        EventNames.EXPORTER_END,
        new ExporterEndEvent({
          message: 'Finished',
          ...baseEvent,
          status: AccountStatus.DONE,
          exportedTransactionsNum: exportTransactionsResult.exportedTransactionsNum,
        }),
      );
      executionResult[outputVendor.name] = exportTransactionsResult;
      successCount++;
      totalExported += exportTransactionsResult.exportedTransactionsNum;
    } catch (e) {
      const error = e as Error;
      failedCount++;

      log.error('EXPORTER_FAILED', error, {
        exporter: outputVendor.name,
        duration: `${Date.now() - exporterStartTime}ms`,
      });

      await eventPublisher.emit(
        EventNames.EXPORTER_ERROR,
        new ExporterEvent({
          message: error.message,
          error: error,
          ...baseEvent,
        }),
      );
      throw e;
    }
  });

  await Promise.all(exportPromises);

  const result = failedCount === 0 ? 'success' : successCount === 0 ? 'failed' : 'partial';
  log.summary(result, {
    exportersAttempted: activeExporters.length,
    exportersSucceeded: successCount,
    exportersFailed: failedCount,
    totalExported,
  });

  await eventPublisher.emit(EventNames.EXPORT_PROCESS_END);
  return executionResult;
}
