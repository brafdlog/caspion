module.exports = {
  testRunner: 'jest-circus/runner',
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: './screenshotEnvironment.js',
};
