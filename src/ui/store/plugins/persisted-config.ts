import VuexPersistence from 'vuex-persist';
import { configManager } from '@/backend';
import { configFilePath } from '@/app-globals';

export default (configModuleName: string) => new VuexPersistence<any>({
  modules: [configModuleName],
  saveState: async (_key, state) => configManager.updateConfig(configFilePath, state[configModuleName]),
  restoreState: async (_key) => configManager.getConfig(configFilePath)
    .then((config) => ({ [configModuleName]: config })),
  asyncStorage: true,
})
  .plugin;
