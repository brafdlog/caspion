/* eslint-disable global-require, import/no-dynamic-require */
import each from 'jest-each';
import fs from 'fs';
import path from 'path';

const vendorsIndexes = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map(({ name }) => path.join(__dirname, name))
  .filter((dir) => fs.readdirSync(dir).includes('index.js'))
  .map((dir) => path.join(dir, 'index.js'));

describe('Validate vendors interface', () => {
  each([vendorsIndexes])
    .describe('Vendor %s', (vendorPath) => {
      let vendor;
      beforeAll(() => {
        vendor = require(vendorPath);
      });

      it('Should contains \'name\' as string', () => {
        expect(vendor).toHaveProperty('name');
        expect(typeof vendor.name).toBe('string');
      });
    });
});
