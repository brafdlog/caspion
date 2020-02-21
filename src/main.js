import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import App from './App';
import router from './router';
import store from './store';

import './plugins/element';
import LoggerPlugin from './plugins/logger';
import vuetify from './plugins/vuetify';


const logger = electron.remote.getGlobal('logger');
logger.info('The renderer process got the logger');
Vue.use(LoggerPlugin, { logger });

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store,

  created() {
    logger.info('Main Vue component registered');
  },

  vuetify,
  render: (h) => h(App),
}).$mount('#app');
