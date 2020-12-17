import { encryptObject, decryptObject } from '../../../src/backend/modules/encryption/credentials';

function isNotNullOrEmptyOrUndefined(value) {
  return value && value !== null && value !== '';
}

test('Should encrypt value of simple object', async () => {
  const original = { key: 'value' };
  const encrypted = await encryptObject(original);

  const originalKeys = Object.keys(original);
  const encryptedKeys = Object.keys(encrypted);

  // keys
  expect(encryptedKeys.length).toEqual(1);
  expect(encryptedKeys[0]).toEqual(originalKeys[0]);

  // values
  expect(isNotNullOrEmptyOrUndefined(encrypted[encryptedKeys[0]])).toBe(true);
  expect(encrypted[encryptedKeys[0]]).not.toEqual(original[originalKeys[0]]);
});

test('Should throw when encrypt a number value', async () => {
  const original = { key: 1234 };
  await expect(encryptObject(original)).rejects.toThrowError();
});

test('Should encrypt an array values', async () => {
  const original = { key: ['arr1', 'arr2', 'arr3'] };
  const encrypted = await encryptObject(original);

  const originalKeys = Object.keys(original);
  const encryptedKeys = Object.keys(encrypted);

  const originalValue = original[originalKeys[0]];
  const encryptedValue = encrypted[encryptedKeys[0]];

  // keys
  expect(encryptedKeys.length).toEqual(1);
  expect(encryptedKeys[0]).toEqual(originalKeys[0]);

  // values
  expect(isNotNullOrEmptyOrUndefined(encryptedValue)).toBe(true);
  expect(Array.isArray(encryptedValue)).toBe(true);
  expect(encryptedValue).not.toEqual(originalValue);
});

test('Should encrypt a complex object values', async () => {
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
  const encrypted: any = await encryptObject(original);

  // values - arrKey
  expect(isNotNullOrEmptyOrUndefined(encrypted.arrKey)).toBe(true);
  expect(Array.isArray(encrypted.arrKey)).toBe(true);
  expect(encrypted.arrKey).toHaveLength(original.arrKey.length);
  expect(encrypted.arrKey).not.toStrictEqual(original.arrKey);

  // values - arrComplex
  expect(isNotNullOrEmptyOrUndefined(encrypted.arrComplex)).toBe(true);
  expect(Array.isArray(encrypted.arrComplex)).toBe(true);
  expect(encrypted.arrComplex).toHaveLength(original.arrComplex.length);
  expect(encrypted.arrComplex).not.toStrictEqual(original.arrComplex);

  // values - arrComplex[1] (objKey)
  expect(isNotNullOrEmptyOrUndefined(encrypted.arrComplex[1].objKey)).toBe(true);
  expect(typeof encrypted.arrComplex[1]).toBe('object');
  expect(encrypted.arrComplex[1]).toMatchObject(encrypted.arrComplex[1]);
  expect(encrypted.arrComplex[1]).not.toStrictEqual(original.arrComplex[1]);

  // values - arrComplex[2] (Array)
  expect(isNotNullOrEmptyOrUndefined(encrypted.arrComplex[2])).toBe(true);
  expect(Array.isArray(encrypted.arrComplex[2])).toBe(true);
  expect(encrypted.arrComplex[2]).toHaveLength((original.arrComplex[2] as string[]).length);
  expect(encrypted.arrComplex[2]).not.toStrictEqual(original.arrComplex[2]);

  // values - objKey
  expect(isNotNullOrEmptyOrUndefined(encrypted.objKey)).toBe(true);
  expect(typeof encrypted.objKey).toBe('object');
  expect(encrypted.objKey).toMatchObject(encrypted.objKey);
  expect(encrypted.objKey).not.toStrictEqual(original.objKey);

  // values - objKey.arrKey (Array)
  expect(isNotNullOrEmptyOrUndefined(encrypted.objKey.arrKey)).toBe(true);
  expect(Array.isArray(encrypted.objKey.arrKey)).toBe(true);
  expect(encrypted.objKey.arrKey).toHaveLength(original.objKey.arrKey.length);
  expect(encrypted.objKey.arrKey).not.toStrictEqual(original.objKey.arrKey);
});

test('Should encrypt and decrypt and get exactly the same object', async () => {
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

  expect(actual).toStrictEqual(original);
});
