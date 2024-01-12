import { createDirectStore } from 'direct-vuex';
import Vue from 'vue';
import Vuex from 'vuex';
import Config from './modules/config';
import configPersistPlugin from './plugins/persisted-config';

Vue.use(Vuex);

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  modules: {
    Config
  },
  plugins: [configPersistPlugin('Config')],
  strict: process.env.NODE_ENV !== 'production',
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store
declare module 'vuex' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    direct: AppStore
  }
}
