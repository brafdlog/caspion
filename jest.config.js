import { defaults } from 'jest-config';

export default {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch:
    [
      '**/__test__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
  roots: [
    'test/unit',
    'src',
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'vue',
  ],
  moduleDirectories: [
    ...defaults.moduleDirectories,
    'src',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(babel-jest|jest-vue-preprocessor)/)',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    electron: '<rootDir>/test/unit/mock/electron.js',
  },
  transform:
  {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
