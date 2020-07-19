const { defaults } = require('jest-config');

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
    electron: '<rootDir>/test/unit/mock/electron.js',
    '^keytar$': '<rootDir>/test/unit/mock/keytar.js',
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
