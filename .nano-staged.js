import { resolve, sep } from 'path';

const fileNameToPackageName = (filename) =>
  filename.replace(resolve(process.cwd(), 'packages') + sep, '').split(sep)[0];

export default {
  '*.{js,mjs,cjs,ts,mts,cts,tsx}': ({ filenames }) => {
    const packages = new Set(filenames.map(fileNameToPackageName));
    if (packages.has('')) {
      return ['yarn lint:fix --cache', 'yarn format'];
    }
    return [...packages].flatMap((p) => [
      `yarn workspace @caspion/${p} lint:fix --cache`,
      `yarn workspace @caspion/${p} format`,
    ]);
  },

  /**
   * Run typechecking if any type-sensitive files or project dependencies was changed
   * @param {string[]} filenames
   * @return {string[]}
   */
  '{package-lock.json,packages/**/{*.ts,*.tsx,tsconfig.json}}': ({ filenames }) => {
    // if dependencies was changed run type checking for all packages
    if (filenames.some((f) => f.endsWith('package-lock.json'))) {
      return ['yarn typecheck'];
    }

    // else run type checking for staged packages
    return [...new Set(filenames.map(fileNameToPackageName))].map((p) => `yarn workspace @caspion/${p} typecheck`);
  },
};
