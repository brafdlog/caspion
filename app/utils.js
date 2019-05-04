function jsonStringifyPretty(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = {
  jsonStringifyPretty
};
