import Vue from 'vue';
import Vuex from 'vuex';
import migrations from './migrations';
import modules from './modules';
import configPersistPlugin from './plugins/persisted-config';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  // TODO: https://github.com/brafdlog/budget-tracking/issues/51#issuecomment-658835043
  // This plugin just copy the config state,
  // if the backup will fail, we will have two configs- filesystem and store
  // Maybe we need to backup in the action
  plugins: [configPersistPlugin('Config')],
  strict: process.env.NODE_ENV !== 'production',
});

const previousMigration = store.state.Migrations.last;
migrations.filter((migration) => migration.number > previousMigration).forEach((migration) => {
  const stateCopy = JSON.parse(JSON.stringify(store.state));
  store.replaceState(migration.migration(stateCopy));
});

store.dispatch('updateLast', migrations.slice(-1)[0].number);

export default store;
