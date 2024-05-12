import {
  ExportTransactionsFunction,
  ExportTransactionsParams,
  ExportTransactionsResult,
  OutputVendor,
  OutputVendorName,
} from '@/backend/commonTypes';

const exportTransactions: ExportTransactionsFunction = async (
  _: ExportTransactionsParams,
  eventPublisher: any,
) => {
  return {} as ExportTransactionsResult;
};

const firefly: OutputVendor = {
  name: OutputVendorName.FIREFLY,
  exportTransactions,
};

export default firefly;
