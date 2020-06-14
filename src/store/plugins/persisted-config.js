// eslint-disable-next-line import/no-unresolved
import { configManager } from '@/originalBudgetTrackingApp';
import VuexPersistence from 'vuex-persist';

export default (configModuleName) => new VuexPersistence({
  modules: [configModuleName],
  saveState: async (_key, state) => configManager.updateConfig(state),
  restoreState: async (_key) => configManager.getConfig(),
  asyncStorage: true,
})
  .plugin;
