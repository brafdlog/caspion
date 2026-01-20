import {
  OutputVendorName,
  type EnrichedTransaction,
  type ExportTransactionsFunction,
  type OutputVendor,
} from '@/backend/commonTypes';
import { mergeTransactions, sortByDate } from '@/backend/transactions/transactions';
import { promises as fs } from 'fs';
import { logAppEvent } from '/@/logging/operationLogger';

const parseTransactionsFile = async (filename: string) => {
  try {
    const content = await fs.readFile(filename, { encoding: 'utf8' });
    return JSON.parse(content) as EnrichedTransaction[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      logAppEvent('JSON_FILE_NOT_FOUND', { filePath: filename, action: 'creating_new' });
      return [] as EnrichedTransaction[];
    }
    logAppEvent('JSON_PARSE_ERROR', {
      filePath: filename,
      errorMessage: (err as Error).message,
    });
    throw err;
  }
};

const exportTransactions: ExportTransactionsFunction = async ({ transactionsToCreate, outputVendorsConfig }) => {
  const startTime = Date.now();
  const { filePath } = outputVendorsConfig.json!.options;

  logAppEvent('JSON_EXPORT_READING_FILE', { filePath });
  const savedTransactions = await parseTransactionsFile(filePath);

  const mergedTransactions = mergeTransactions(savedTransactions, transactionsToCreate);
  const sorted = sortByDate(mergedTransactions);
  const newTransactionsCount = mergedTransactions.length - savedTransactions.length;

  logAppEvent('JSON_EXPORT_WRITING', {
    filePath,
    existingCount: savedTransactions.length,
    newCount: newTransactionsCount,
    totalCount: mergedTransactions.length,
    duration: `${Date.now() - startTime}ms`,
  });

  await fs.writeFile(filePath, JSON.stringify(sorted, null, 4));
  return {
    exportedTransactionsNum: newTransactionsCount,
  };
};

export default {
  name: OutputVendorName.JSON,
  exportTransactions,
} as OutputVendor;
