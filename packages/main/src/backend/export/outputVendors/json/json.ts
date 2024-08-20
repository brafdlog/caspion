import { promises as fs } from 'fs';
import {
  type EnrichedTransaction, type ExportTransactionsFunction, type OutputVendor} from '@/backend/commonTypes';
import { OutputVendorName,
} from '@/backend/commonTypes';
import { mergeTransactions, sortByDate } from '@/backend/transactions/transactions';

const parseTransactionsFile = async (filename: string) => {
  try {
    const content = await fs.readFile(filename, { encoding: 'utf8' });
    return JSON.parse(content) as EnrichedTransaction[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return [] as EnrichedTransaction[];
    }
    throw err;
  }
};

const exportTransactions: ExportTransactionsFunction = async ({ transactionsToCreate, outputVendorsConfig }) => {
  const { filePath } = outputVendorsConfig.json!.options;
  const savedTransactions = await parseTransactionsFile(filePath);
  const mergedTransactions = mergeTransactions(savedTransactions, transactionsToCreate);
  const sorted = sortByDate(mergedTransactions);
  await fs.writeFile(filePath, JSON.stringify(sorted, null, 4));
  return {
    exportedTransactionsNum: mergedTransactions.length - savedTransactions.length,
  };
};

export default {
  name: OutputVendorName.JSON,
  exportTransactions,
} as OutputVendor;
