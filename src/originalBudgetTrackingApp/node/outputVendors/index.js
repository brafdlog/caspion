const files = require.context('.', true, /\.\/.+\/index\.js$/);

export default files.keys().reduce((acc, key) => {
  const output = files(key);
  acc[output.name] = output;
  return acc;
}, {});
