import { configFilePath } from '@/app-globals';
import { configManager } from '@/backend';
import { app } from '@electron/remote';
import VuexPersistence from 'vuex-persist';

export default (configModuleName: string) => new VuexPersistence<any>({
  modules: [configModuleName],
  saveState: async (_key, state) => configManager.updateConfig(configFilePath(app), state[configModuleName]),
  restoreState: async (_key) => configManager.getConfig(configFilePath(app))
    .then((config) => ({ [configModuleName]: config })),
  asyncStorage: true,
})
  .plugin;
