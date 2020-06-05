const faq = require('./content/FAQ');

const globals = {
  FAQ_STRINGS_LIST: faq,
  GITHUB_REPO: 'baruchiro/israeli-bank-scrapers-desktop',
};

const stringified = Object.keys(globals).reduce((acc, globalName) => {
  acc[globalName] = JSON.stringify(globals[globalName]);
  return acc;
}, {});

module.exports = {
  globals,
  stringified,
};
