import { Transactions } from '../helpers/baseStore';
import { getHash } from '../../../src/renderer/modules/transactions';

describe('transaction.js (The transactions helper)', () => {
  it('Should create hash key for transaction', () => {
    const firstTransaction = Object.values(Transactions)[0];
    const hashKey = getHash(firstTransaction);

    expect(hashKey).to.not.equal(0);
  });

  it('Should be a string hash', () => {
    const firstTransaction = Object.values(Transactions)[0];
    const hashKey = getHash(firstTransaction);

    expect(typeof hashKey).to.eq('string');
  });

  it('Should be the expected hash', () => {
    const firstTransactionHash = Object.keys(Transactions)[0];
    const firstTransaction = Object.values(Transactions)[0];

    const hashKey = getHash(firstTransaction);

    expect(hashKey).to.eq(firstTransactionHash);
  });

  it('Two empty transactions in the same day - should be different hash', () => {
    const transactionObjects = Object.values(Transactions);
    transactionObjects[0].chargedAmount = transactionObjects[1].chargedAmount = 0;
    transactionObjects[0].date = transactionObjects[1].date;

    const firstHashKey = getHash(transactionObjects[0]);
    const secondHashKey = getHash(transactionObjects[1]);

    assert.notEqual(firstHashKey, secondHashKey);
  });
});
