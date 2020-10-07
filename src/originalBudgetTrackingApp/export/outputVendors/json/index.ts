import {
  EnrichedTransaction, ExportTransactionsFunction, OutputVendor, OutputVendorName
} from '@/originalBudgetTrackingApp/commonTypes';
import { mergeTransactions } from '@/originalBudgetTrackingApp/transactions/transactions';
import { parseFile, writeFile } from './filesystem';

const exportTransactions: ExportTransactionsFunction<OutputVendorName.JSON> = async ({
  transactionsToCreate,
  outputVendorsConfig
}) => {
  const { filePath } = outputVendorsConfig.options;
  const savedTransactions = await parseFile<EnrichedTransaction[]>(filePath, []);
  const mergedTransactions = mergeTransactions(savedTransactions, transactionsToCreate);
  await writeFile(
    filePath,
    JSON.stringify(Object.values(mergedTransactions), null, 4),
  );
};

export default {
  name: OutputVendorName.JSON,
  exportTransactions
} as OutputVendor<OutputVendorName.JSON>;
