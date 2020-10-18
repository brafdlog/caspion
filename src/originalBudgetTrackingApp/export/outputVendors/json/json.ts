import {
  EnrichedTransaction, ExportTransactionsFunction, OutputVendor, OutputVendorName
} from '@/originalBudgetTrackingApp/commonTypes';
import { mergeTransactions, sortByDate } from '@/originalBudgetTrackingApp/transactions/transactions';
import { promises as fs } from 'fs';

const parseTransactionsFile = async (filename: string) => {
  try {
    const content = await fs.readFile(filename, { encoding: 'utf8' });
    return JSON.parse(content) as EnrichedTransaction[];
  } catch (err) {
    if (err.code === 'ENOENT') {
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
};

export default {
  name: OutputVendorName.JSON,
  exportTransactions
} as OutputVendor;
