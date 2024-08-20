import { type TransactionInstallments } from 'israeli-bank-scrapers-core/lib/transactions';
import { promises as fs } from 'fs';
import { stringify } from 'csv-stringify/sync';
import { parse } from 'csv-parse/sync';
import {
  type EnrichedTransaction, type ExportTransactionsFunction, type OutputVendor} from '@/backend/commonTypes';
import { OutputVendorName,
} from '@/backend/commonTypes';
import { mergeTransactions, sortByDate } from '@/backend/transactions/transactions';

export function parseTransactions(csvText: string) {
  return parse(csvText, {
    columns: true,
    bom: true,
    ltrim: true,
    rtrim: true,
    cast: (value, context) => {
      return parseColumn(value, context.column);
    },
  }) as unknown as EnrichedTransaction[];
}

function parseColumn(value:string, column: string | number) {
  switch (column) {
    case 'chargedAmount':
    case 'identifier':
    case 'originalAmount':
      return value === '' ? undefined : parseFloat(value);

    case 'installments':
      return parseInstallments(value);

    default:
      return value;
  }
}

function parseInstallments(value: string) {
  if (value === '') {
    return undefined;
  }
  const separator = value.indexOf('/');
  if (separator !== -1) {
    const installments: TransactionInstallments = {
      number: parseInt(value.substring(0, separator - 1), 10),
      total: parseInt(value.substring(separator + 1), 10),
    };
    return installments;
  }
  return value;
}

export const serializeTransactions = (transactions: EnrichedTransaction[]) => {
  return stringify(transactions, {
    header: true,
    columns: [
      { key: 'date' },
      { key: 'description' },
      { key: 'chargedAmount' },
      { key: 'memo' },
      { key: 'category' },
      { key: 'accountNumber' },
      { key: 'installments' },
      { key: 'originalAmount' },
      { key: 'originalCurrency' },
      { key: 'processedDate' },
      { key: 'identifier' },
      { key: 'hash' },
      { key: 'status' },
      { key: 'type' },
    ],
    cast: {
      object: (value, context) => {
        if (context.column === 'installments' && !context.header) {
          return `${value.number} / ${value.total}`;
        }
        return `${value}`;
      },
    },
  });
};

const exportTransactions: ExportTransactionsFunction = async ({ transactionsToCreate, outputVendorsConfig }) => {
  const { filePath } = outputVendorsConfig.csv!.options;
  const savedTransactions = await parseTransactionsFile(filePath);
  const mergedTransactions = mergeTransactions(savedTransactions, transactionsToCreate);
  const sorted = sortByDate(mergedTransactions);
  await writeCsvFile(filePath, serializeTransactions(sorted));
  return {
    exportedTransactionsNum: mergedTransactions.length - savedTransactions.length,
  };
};

const parseTransactionsFile = async (filename: string) => {
  try {
    const content = await fs.readFile(filename, { encoding: 'utf8' });
    return parseTransactions(content);
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      return [] as EnrichedTransaction[];
    }
    throw e;
  }
};

async function writeCsvFile(filePath: string, csvText: string) {
  await fs.writeFile(filePath, `\ufeff${csvText}`, { encoding: 'utf8' });
}

export default {
  name: OutputVendorName.CSV,
  exportTransactions,
} as OutputVendor;
