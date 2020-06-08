import Vue from 'vue';
import Vuex from 'vuex';
import configManagerPlugin from './plugins/persisted-config';

import modules from './modules';
import migrations from './migrations';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [configManagerPlugin('config')],
  strict: process.env.NODE_ENV !== 'production',
});

const previousMigration = store.state.Migrations.last;
migrations.filter((migration) => migration.number > previousMigration).forEach((migration) => {
  const stateCopy = JSON.parse(JSON.stringify(store.state));
  store.replaceState(migration.migration(stateCopy));
});

store.dispatch('updateLast', migrations.slice(-1)[0].number);

export default store;
