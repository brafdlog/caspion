import { formatDate, unixMilli } from './dates';
import hash from './hash';

/*
{
  success: boolean,
  accounts: [{
    accountNumber: string,
    txns: [{
      type: string, // can be either 'normal' or 'installments'
      identifier: int, // only if exists
      date: string, // ISO date string
      processedDate: string, // ISO date string
      originalAmount: double,
      originalCurrency: string,
      chargedAmount: double,
      description: string,
      memo: string, // can be null or empty
      installments: {
        number: int, // the current installment number
        total: int, // the total number of installments
      },
      status: string //can either be 'completed' or 'pending'
    }],
  }],
  errorType: "invalidPassword"|"changePassword"|"timeout"|"generic", // only on success=false
  errorMessage: string, // only on success=false
}
*/

export const properties = [
  {
    name: 'type',
    title: 'Type',
  },
  {
    name: 'identifier',
    title: 'Identifier',
  },
  {
    name: 'date',
    title: 'Date',
    column: true,
    hash: (value) => unixMilli(value),
  },
  {
    name: 'processedDate',
    title: 'Processed Date',
  },
  {
    name: 'originalAmount',
    title: 'Original Amount',
  },
  {
    name: 'originalCurrency',
    title: 'Original Currency',
  },
  {
    name: 'chargedAmount',
    title: 'Charged Amount',
    column: true,
    hash: true,
  },
  {
    name: 'description',
    title: 'Description',
    column: true,
    hash: (value) => hash(value),
  },
  {
    name: 'memo',
    title: 'Memo',
  },
  {
    name: 'number',
    title: 'Installments Number',
  },
  {
    name: 'total',
    title: 'Installments Total',
  },
  {
    name: 'status',
    title: 'Status',
  },
];

const formatters = {
  date: (value) => formatDate(value),
  processedDate: (value) => formatDate(value),
};

export function format(property, value) {
  return formatters[property] ? formatters[property](value) : value;
}

export function getHash(transaction) {
  const hashProps = properties.filter((p) => p.hash);
  const key = hashProps.reduce((prev, prop) => {
    const value = transaction[prop.name];
    if (typeof prop.hash === 'function') {
      return prev + prop.hash(value).toString();
    }
    return prev + value.toString();
  }, '');
  return key;
}

export function transactionArrayToObject(transactions) {
  return transactions.reduce((prev, current) => {
    const hash = current.hash || getHash(current);
    prev[getHash(current)] = { ...current, hash };
    return prev;
  }, {});
}

export function saveToFile(transactions, filename, callback) {
  const Datastore = require('nedb');
  const db = new Datastore({ filename, autoload: true });
  db.insert(transactions, callback);
  db.persistence.compactDatafile();
}
