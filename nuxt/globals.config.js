const faq = require('./content/FAQ');

const globals = {
  FAQ_STRINGS_LIST: faq,
  GITHUB_REPO: 'brafdlog/hiuvi',
  BASE_URL: 'https://brafdlog.github.io',
  BASE_PATH: '/hiuvi/',
};

const stringified = Object.keys(globals).reduce((acc, globalName) => {
  acc[globalName] = JSON.stringify(globals[globalName]);
  return acc;
}, {});

module.exports = {
  globals,
  stringified,
};
