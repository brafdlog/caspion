const fs = require('fs');
const path = require('path');

const faqDir = './content/FAQ';
const allMD = fs.readdirSync(faqDir);
const allContent = allMD.map((file) => fs.readFileSync(path.join(faqDir, file)).toString());

module.exports = {
  FAQ_STRINGS_LIST: JSON.stringify(allContent),
  GITHUB_REPO: JSON.stringify('baruchiro/israeli-bank-scrapers-desktop'),
};
