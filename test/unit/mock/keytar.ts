const fakeKeytarValut = {};
export default {
  getPassword(_serviceName, accountName) {
    return Promise.resolve(fakeKeytarValut[accountName]);
  },
  setPassword(_serviceName, accountName, password) {
    fakeKeytarValut[accountName] = password;
    return Promise.resolve();
  },
};
