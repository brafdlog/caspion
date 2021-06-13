const fs = require('fs');
const path = require('path');

const sortFiles = (a, b) => {
  const num1 = parseInt(a.split('.')[0], 10);
  const num2 = parseInt(b.split('.')[0], 10);

  return num1 - num2;
};

const allMD = fs.readdirSync(__dirname).filter((file) => path.extname(file) === '.md').sort(sortFiles);
const allContent = allMD.map((file) => fs.readFileSync(path.join(__dirname, file)).toString());

module.exports = allContent;
