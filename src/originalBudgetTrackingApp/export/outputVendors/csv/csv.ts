import {
  EnrichedTransaction, ExportTransactionsFunction, OutputVendor, OutputVendorName
} from '@/originalBudgetTrackingApp/commonTypes';
import { mergeTransactions, sortByDate } from '@/originalBudgetTrackingApp/transactions/transactions';
import { TransactionInstallments } from '@brafdlog/israeli-bank-scrapers-core/lib/transactions';
import { promises as fs } from 'fs';

const stringify = require('csv-stringify/lib/sync');
const parse = require('csv-parse/lib/sync');

export function parseTransactions(csvText: string) {
  return parse(csvText, {
    columns: true,
    cast: (value, context) => {
      switch (context.column) {
        // note: we check here some number-type values.
        // if there are undefined string-type values (memo?, for example) they'll be serialized as empty string.
        // it means that the deserialized object will not be 100% identical to the serialzed.
        // I'm not sure how to represent empty string differently than undefined string.
        case 'chargedAmount':
        case 'identifier':
        case 'originalAmount':
          if (value === '') {
            return undefined;
          }
          return parseFloat(value);
        case 'installments':
          if (value === '') {
            return undefined;
          }
          {
            const separator = value.indexOf('/');
            if (separator !== -1) {
              const installments: TransactionInstallments = {
                number: parseInt(value.substring(0, separator - 1), 10),
                total: parseInt(value.substring(separator + 1), 10)
              };
              return installments;
            }
            return value;
          }
        default:
          return value;
      }
    }
  }) as EnrichedTransaction[];
}

export const serializeTransactions = (transactions: EnrichedTransaction[]) => {
  return stringify(transactions, {
    header: true,
    columns: [
      { key: 'identifier' },
      { key: 'chargedAmount' },
      { key: 'date' },
      { key: 'description' },
      { key: 'installments' },
      { key: 'memo' },
      { key: 'originalAmount' },
      { key: 'originalCurrency' },
      { key: 'processedDate' },
      { key: 'accountNumber' },
      { key: 'category' },
      { key: 'hash' },
      { key: 'status' },
      { key: 'type' },
      { key: 'category' }
    ],
    cast: {
      object: (value, context) => {
        if (context.column === 'installments' && !context.header) {
          return `${value.number} / ${value.total}`;
        }
        return value;
      }
    }
  });
};

const parseTransactionsFile = async (filename: string) => {
  try {
    const content = await fs.readFile(filename, { encoding: 'utf8' });
    return parseTransactions(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [] as EnrichedTransaction[];
    }
    throw err;
  }
};

async function writeCsvFile(filePath: string, csvText: string) {
  await fs.writeFile(filePath, csvText);
}

const exportTransactions: ExportTransactionsFunction = async ({ transactionsToCreate, outputVendorsConfig }) => {
  const { filePath } = outputVendorsConfig.csv!.options;
  const savedTransactions = await parseTransactionsFile(filePath);
  const mergedTransactions = mergeTransactions(savedTransactions, transactionsToCreate);
  const sorted = sortByDate(mergedTransactions);
  writeCsvFile(filePath, serializeTransactions(sorted));
};

export default {
  name: OutputVendorName.CSV,
  exportTransactions
} as OutputVendor;
