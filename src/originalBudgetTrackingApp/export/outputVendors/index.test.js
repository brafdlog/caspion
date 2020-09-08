/* eslint-disable global-require, import/no-dynamic-require */
import each from 'jest-each';
import fs from 'fs';
import path from 'path';

const pseudoInterface = {
  displayName: typeof '',
  description: typeof '',
  output: typeof (async () => {}),
  fields: typeof ({}),
};

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

      each(Object.keys(pseudoInterface))
        .it('Should contains %s with expected type', (key) => {
          expect(vendor).toHaveProperty(key);
          expect(typeof vendor[key]).toBe(pseudoInterface[key]);
        });
    });
});
