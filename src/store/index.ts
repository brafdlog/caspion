import Vue from 'vue';
import Vuex from 'vuex';
import Config from './modules/Config';
import configPersistPlugin from './plugins/persisted-config';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Config
  },
  // TODO: https://github.com/brafdlog/budget-tracking/issues/51#issuecomment-658835043
  // This plugin just copy the config state,
  // if the backup will fail, we will have two configs- filesystem and store
  // Maybe we need to backup in the action
  plugins: [configPersistPlugin('Config')],
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
