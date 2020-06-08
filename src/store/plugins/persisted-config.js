import createPersistedState from 'vuex-persistedstate';
import { configManager } from '@/originalBudgetTrackingApp';

const createConfigManagerStorage = (keyName) => ({
  getItem: async (key) => {
    return key === keyName ? configManager.getConfig() : Promise.resolve();
  },
  setItem: async (key, value) => {
    if (key === keyName) await configManager.updateConfig(value);
  },
  removeItem: (key) => console.log(key),
});

export default (keyName) => createPersistedState({
  key: keyName,
  paths: [keyName],
  storage: createConfigManagerStorage(keyName),
});
