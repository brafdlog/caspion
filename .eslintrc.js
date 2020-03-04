const globals = require('./globals')

module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },

  env: {
    browser: true,
    node: true,
  },

  extends: ['airbnb-base', 'plugin:vue/recommended'],

  globals: {
    __static: 'writable',
    ...globals.reduce((prev, curr) => {
      prev[curr] = 'readonly';
      return prev;
    }, {}),
  },

  plugins: [
    'import',
    'vue',
    'html',
  ],

  settings: {
    'import/core-modules': [ 'electron' ],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue']
      }
    }
  },

  rules: {
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }],
    'no-shadow': ['error', { allow: ['state'] }],
    'import/extensions': ['error', { js: 'never', vue: 'never', json: 'always' }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'linebreak-style': process.platform === 'win32' ? 0 : 2,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
