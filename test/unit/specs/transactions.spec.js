import { getHash } from 'modules/transactions';
import { Transactions } from '../helpers/baseStore';

describe('transaction.js (The transactions helper)', () => {
  it('Should create hash key for transaction', () => {
    const firstTransaction = Object.values(Transactions)[0];
    const hashKey = getHash(firstTransaction);

    expect(hashKey).not.toBe(0);
  });

  it('Should be a string hash', () => {
    const firstTransaction = Object.values(Transactions)[0];
    const hashKey = getHash(firstTransaction);

    expect(typeof hashKey).toBe('string');
  });

  it('Should be the expected hash', () => {
    const firstTransactionHash = Object.keys(Transactions)[0];
    const firstTransaction = Object.values(Transactions)[0];

    const hashKey = getHash(firstTransaction);

    expect(hashKey).toBe(firstTransactionHash);
  });

  it('Two empty transactions in the same day - should be different hash', () => {
    const transactionObjects = Object.values(Transactions);
    transactionObjects[0].chargedAmount = transactionObjects[1].chargedAmount = 0;
    transactionObjects[0].date = transactionObjects[1].date;

    const firstHashKey = getHash(transactionObjects[0]);
    const secondHashKey = getHash(transactionObjects[1]);
    expect(firstHashKey).not.toMatch(secondHashKey);
  });
});
