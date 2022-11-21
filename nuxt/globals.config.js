const faq = require('./content/FAQ');

const globals = {
  FAQ_STRINGS_LIST: faq,
  GITHUB_REPO: 'brafdlog/caspion',
  BASE_URL: 'https://brafdlog.github.io',
  BASE_PATH: '',
  TITLE: 'כספיון',
  DESCRIPTION: 'כספיון מרכז למקום אחד את כל פירוטי ההוצאות שלך',
};

const stringified = Object.keys(globals).reduce((acc, globalName) => {
  acc[globalName] = JSON.stringify(globals[globalName]);
  return acc;
}, {});

module.exports = {
  globals,
  stringified,
};
