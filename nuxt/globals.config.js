const fs = require('fs');
const path = require('path');

const faqDir = './content/FAQ';
const allMD = fs.readdirSync(faqDir);
const allContent = allMD.map((file) => fs.readFileSync(path.join(faqDir, file)).toString());

const globals = {
  FAQ_STRINGS_LIST: allContent,
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
