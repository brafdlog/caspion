const { defaults } = require('jest-config');

module.exports = {
  roots: ['test/unit', 'src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'vue'],
  moduleDirectories: [...defaults.moduleDirectories, 'src'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
