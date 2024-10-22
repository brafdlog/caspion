module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: ['../../.eslintrc.cjs', 'plugin:react-hooks/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {},
};
