import { EnrichedTransaction } from '../commonTypes';
import { Transaction } from '../import/bankScraper';

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

// export const properties = [
//   {
//     name: 'type',
//     title: 'Type',
//   },
//   {
//     name: 'identifier',
//     title: 'Identifier',
//   },
//   {
//     name: 'date',
//     title: 'Date',
//     column: true,
//     hash: (value) => unixMilli(value),
//   },
//   {
//     name: 'processedDate',
//     title: 'Processed Date',
//   },
//   {
//     name: 'originalAmount',
//     title: 'Original Amount',
//   },
//   {
//     name: 'originalCurrency',
//     title: 'Original Currency',
//   },
//   {
//     name: 'chargedAmount',
//     title: 'Charged Amount',
//     column: true,
//     hash: true,
//   },
//   {
//     name: 'description',
//     title: 'Description',
//     column: true,
//     hash: (value) => calculateHash(value),
//   },
//   {
//     name: 'memo',
//     title: 'Memo',
//   },
//   {
//     name: 'number',
//     title: 'Installments Number',
//   },
//   {
//     name: 'total',
//     title: 'Installments Total',
//   },
//   {
//     name: 'status',
//     title: 'Status',
//   },
// ];

const transactionArrayToObject = (transactions: EnrichedTransaction[]) => transactions.reduce((acc, enrichedTransaction) => {
  acc[enrichedTransaction.hash] = enrichedTransaction;
  return acc;
}, {} as Record<string, EnrichedTransaction>);

export const calculateTransactionHash = ({
  date, chargedAmount, description, memo
}: Transaction, companyId: string, accountNumber: string) => {
  return `${date}_${chargedAmount}_${description}_${memo}_${companyId}_${accountNumber}`;
};

export const mergeTransactions = (a: EnrichedTransaction[], b: EnrichedTransaction[]) => Object.values({
  ...transactionArrayToObject(a),
  ...transactionArrayToObject(b)
});
