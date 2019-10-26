import { encryptValues } from '../../../src/renderer/modules/credentials';

function isNotNullOrEmptyOrUndefined(value) {
  return value && value !== null && value !== '';
}

describe('credentials.js', () => {
  it('Should encrypt value of simple object', () => {
    const original = { key: 'value' };
    const encrypted = encryptValues(original);

    const originalKeys = Object.keys(original);
    const encryptedKeys = Object.keys(encrypted);

    // keys
    assert.equal(encryptedKeys.length, 1);
    assert.equal(encryptedKeys[0], originalKeys[0]);

    // values
    assert.isTrue(isNotNullOrEmptyOrUndefined(encrypted[encryptedKeys[0]]));
    assert.notEqual(encrypted[encryptedKeys[0]], original[originalKeys[0]]);
  });

  it('Should throw when encrypt a number value', () => {
    const original = { key: 1234 };

    assert.throws(() => encryptValues(original), TypeError);
  });

  it('Should encrypt an array values', () => {
    const original = { key: ['arr1', 'arr2', 'arr3'] };
    const encrypted = encryptValues(original);

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
});
