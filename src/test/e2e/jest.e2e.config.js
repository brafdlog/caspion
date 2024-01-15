module.exports = {
  testRunner: 'jest-circus/runner',
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: './screenshotEnvironment.ts',
};
