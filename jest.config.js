const { defaults } = require('jest-config');
const globals = require('./globals');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/__test__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  roots: ['test/unit', 'src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'vue'],
  moduleDirectories: [...defaults.moduleDirectories, 'src'],
  transformIgnorePatterns: [
    'node_modules/(?!(babel-jest|jest-vue-preprocessor)/)',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@electron/remote$': '<rootDir>/test/unit/mock/electron.ts',
    '^electron$': '<rootDir>/test/unit/mock/electron.ts',
    '^keytar$': '<rootDir>/test/unit/mock/keytar.ts',
  },
  transform: {
    '^.*\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  globals
};
