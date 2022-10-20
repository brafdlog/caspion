import VuexPersistence from 'vuex-persist';
import { configFilePath } from '@/app-globals';
import { configManager } from '@/backend';

export default (configModuleName: string) => new VuexPersistence<any>({
  modules: [configModuleName],
  saveState: async (_key, state) => configManager.updateConfig(configFilePath, state[configModuleName]),
  restoreState: async (_key) => configManager.getConfig(configFilePath)
    .then((config) => ({ [configModuleName]: config })),
  asyncStorage: true,
})
  .plugin;
