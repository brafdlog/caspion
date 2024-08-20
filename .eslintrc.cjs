const globals = require('./globals.cjs');
const readonlyGlobals = Object.keys(globals).reduce((acc, key) => {
  acc[key] = 'readonly';
  return acc;
}, {});

const _productionError = process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: false,
  },
  extends: [
    'eslint:recommended',
    /** @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs */
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.test.json',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules/**', '**/dist/**'],
  globals: {
    ...readonlyGlobals,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    // '@typescript-eslint/prefer-optional-chain': 'warn',
    // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    /**
     * Having a semicolon helps the optimizer interpret your code correctly.
     * This avoids rare errors in optimized code.
     * @see https://twitter.com/alex_kozack/status/1364210394328408066
     */
    semi: ['error', 'always'],
    /**
     * This will make the history of changes in the hit a little cleaner
     */
    'comma-dangle': ['warn', 'always-multiline'],
    /**
     * Just for beauty
     */
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
      },
    ],
  },
};
