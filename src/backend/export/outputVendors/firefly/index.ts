import {
  EnrichedTransaction,
  ExportTransactionsFunction,
  ExportTransactionsParams,
  ExportTransactionsResult,
  OutputVendor,
  OutputVendorName,
} from '@/backend/commonTypes';
import { Api, TransactionStore } from './api/firefly-api';

const convertEnrichedTransactionToFireflyTransaction = (
  transaction: EnrichedTransaction,
): TransactionStore => {
  return {
    transactions: [
      {
        type: transaction.chargedAmount > 0 ? 'deposit' : 'withdrawal',
        date: transaction.date,
        amount: `${Math.abs(transaction.chargedAmount)}`,
        description: transaction.description,
        notes: transaction.memo,
        // source_id: transaction.chargedAmount > 0 ? undefined : transaction.account.id,
        // destination_id: transaction.chargedAmount > 0 ? transaction.account.id : undefined,
        // internal_reference: transaction.identifier,
        // external_id: getExternalId(transaction),
        currency_code: transaction.chargedCurrency,
        process_date: transaction.processedDate,
        // category_name: transaction.category,
      },
    ],
  } as TransactionStore;
};

// TODO: Event Publisher
const exportTransactions: ExportTransactionsFunction = async (
  { transactionsToCreate, outputVendorsConfig }: ExportTransactionsParams,
  eventPublisher: any,
) => {
  const config = outputVendorsConfig[OutputVendorName.FIREFLY];
  if (!config) {
    throw new Error('Firefly config is missing');
  }
  const fireflyClient = new Api({
    baseUrl: config.options.baseURL,
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${config.options.token}`,
      },
    },
  });
  const results = await Promise.all(
    transactionsToCreate
      .map(convertEnrichedTransactionToFireflyTransaction)
      .map((transaction) => fireflyClient.v1.storeTransaction(transaction)),
  );
  const trxCount = results.filter((r) => r.ok).length;
  return {
    exportedTransactionsNum: trxCount,
  } as ExportTransactionsResult;
};

const firefly: OutputVendor = {
  name: OutputVendorName.FIREFLY,
  exportTransactions,
};

export default firefly;
