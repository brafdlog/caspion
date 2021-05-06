const globals = require('./globals');

const readonlyGlobals = Object.keys(globals).reduce((acc, key) => {
  acc[key] = 'readonly';
  return acc;
}, {});

const productionError = process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  root: true,

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018
  },

  env: {
    browser: true,
    node: true
  },

  extends: ['airbnb-base', 'plugin:vue/recommended', '@vue/typescript'],

  globals: {
    __static: 'writable',
    ...readonlyGlobals,
  },

  plugins: [
    'import',
    'vue',
    'html',
  ],

  settings: {
    'import/core-modules': ['electron'],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },

  rules: {
    // 'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }],
    'no-param-reassign': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'import/extensions': ['off'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // allow debugger during development
    'no-debugger': productionError,
    'no-console': productionError,
    'linebreak-style': process.platform === 'win32' ? 0 : 2,
    'no-use-before-define': 'off',
    'max-len': ['error', { code: 160 }],
    'comma-dangle': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_|h' }],
    'arrow-body-style': 'off',
    'object-curly-newline': 'warn',
    'semi': productionError,
    'no-return-assign': 'off',
    'no-restricted-imports': ['error', {
      name: 'electron-log',
      importNames: ['default'],
      message: 'You should import from logging/logger instead'
    }]
  },

  overrides: [
    {
      files: [
        '**/test/**/*.spec.{j,t}s',
        '**/*.test.{j,t}s'
      ],
      env: {
        jest: true,
      },
      rules: {
        'import/extensions': ['error', { js: 'never', vue: 'always', json: 'always' }]
      }
    }
  ],
};
