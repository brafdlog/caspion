import path from 'path';

const files = require.context('.', true, /\.\/.+\/index\.js$/);

export default files.keys().reduce((acc, key) => {
  const vendor = files(key);
  const name = path.basename(key, '.js');
  acc[name] = { name, ...vendor };
  return acc;
}, {});
