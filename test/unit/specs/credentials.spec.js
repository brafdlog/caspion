import * as keytar from 'service/encryption/keytar.service.js';
import { encryptObject, decryptObject } from 'modules/encryption/credentials';

function isNotNullOrEmptyOrUndefined(value) {
  return value && value !== null && value !== '';
}

const fakeKeytarValut = {};
const fakeSaveIntoAccount = async (account, password) => {
  fakeSaveIntoAccount[account] = password;
};
const fakeGetFromAccount = async (account) => fakeKeytarValut[account];

jest.spyOn(keytar, 'loadSALT').mockImplementation().mockReturnValue(Promise.resolve('AAAAAAA'));
jest.spyOn(keytar, 'saveSALT').mockImplementation();
jest.spyOn(keytar, 'saveIntoAccount').mockImplementation(fakeSaveIntoAccount);
jest.spyOn(keytar, 'getFromAccount').mockImplementation(fakeGetFromAccount);
// sinon.stub(keytar, 'loadSALT').returns(Promise.resolve('AAAAAAA'));
// sinon.stub(keytar, 'saveSALT');
// sinon.stub(keytar, 'saveIntoAccount').callsFake(fakeSaveIntoAccount);
// sinon.stub(keytar, 'getFromAccount').callsFake(fakeGetFromAccount);

describe('credentials.js', () => {
  it('Should encrypt value of simple object', async () => {
    const original = { key: 'value' };
    const encrypted = await encryptObject(original);

    const originalKeys = Object.keys(original);
    const encryptedKeys = Object.keys(encrypted);

    // keys
    assert.equal(encryptedKeys.length, 1);
    assert.equal(encryptedKeys[0], originalKeys[0]);

    // values
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted[encryptedKeys[0]]));
    assert.notEqual(encrypted[encryptedKeys[0]], original[originalKeys[0]]);
  });

  it('Should throw when encrypt a number value', async () => {
    const original = { key: 1234 };

    try {
      const encrypted = await encryptObject(original);
      assert.isUndefined(encrypted);
    } catch (error) {
      assert.instanceOf(error, Error);
    }
  });

  it('Should encrypt an array values', async () => {
    const original = { key: ['arr1', 'arr2', 'arr3'] };
    const encrypted = await encryptObject(original);

    const originalKeys = Object.keys(original);
    const encryptedKeys = Object.keys(encrypted);

    const originalValue = original[originalKeys[0]];
    const encryptedValue = encrypted[encryptedKeys[0]];

    // keys
    assert.equal(encryptedKeys.length, 1);
    assert.equal(encryptedKeys[0], originalKeys[0]);

    // values
    assert.isTrue(isNotNullOrEmptyOrUndefined(encryptedValue));
    assert.isArray(encryptedValue);
    assert.notEqual(encryptedValue, originalValue);
  });

  it('Should encrypt a complex object values', async () => {
    const original = {
      arrKey: ['arr1', 'arr2', 'arr3'],
      arrComplex: [
        'arrval1',
        { objKey: 'objval' },
        ['arrarrval1', 'arrarrval2'],
      ],
      objKey: {
        strKey: 'strValue',
        arrKey: ['arrval1', 'arrval2'],
      },
      strKey: 'strval',
    };
    const encrypted = await encryptObject(original);

    // keys
    assert.hasAllKeys(encrypted, original);

    // values - arrKey
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.arrKey));
    assert.isArray(encrypted.arrKey);
    assert.lengthOf(encrypted.arrKey, original.arrKey.length);
    assert.notDeepEqual(encrypted.arrKey, original.arrKey);

    // values - arrComplex
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.arrComplex));
    assert.isArray(encrypted.arrComplex);
    assert.lengthOf(encrypted.arrComplex, original.arrComplex.length);
    assert.notDeepEqual(encrypted.arrComplex, original.arrComplex);

    // values - arrComplex[1] (objKey)
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.arrComplex[1].objKey), `encrypted.arrComplex[1]: ${encrypted.arrComplex[1]}`);
    assert.isObject(encrypted.arrComplex[1]);
    assert.hasAllKeys(encrypted.arrComplex[1], encrypted.arrComplex[1]);
    assert.notDeepEqual(encrypted.arrComplex[1], original.arrComplex[1]);

    // values - arrComplex[2] (Array)
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.arrComplex[2]));
    assert.isArray(encrypted.arrComplex[2]);
    assert.lengthOf(encrypted.arrComplex[2], original.arrComplex[2].length);
    assert.notDeepEqual(encrypted.arrComplex[2], original.arrComplex[2]);

    // values - objKey
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.objKey), `encrypted.objKey: ${encrypted.objKey}`);
    assert.isObject(encrypted.objKey);
    assert.hasAllKeys(encrypted.objKey, encrypted.objKey);
    assert.notDeepEqual(encrypted.objKey, original.objKey);

    // values - objKey.arrKey (Array)
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted.objKey.arrKey));
    assert.isArray(encrypted.objKey.arrKey);
    assert.lengthOf(encrypted.objKey.arrKey, original.objKey.arrKey.length);
    assert.notDeepEqual(encrypted.objKey.arrKey, original.objKey.arrKey);
  });

  it('Should encrypt and decrypt and get exactly the same object', async () => {
    const original = {
      arrKey: ['arr1', 'arr2', 'arr3'],
      arrComplex: [
        'arrval1',
        { objKey: 'objval' },
        ['arrarrval1', 'arrarrval2'],
      ],
      objKey: {
        strKey: 'strValue',
        arrKey: ['arrval1', 'arrval2'],
      },
      strKey: 'strval',
    };
    const actual = await decryptObject(await encryptObject(original));

    assert.deepEqual(actual, original);
  });
});
