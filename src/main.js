import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/element.js';
import LoggerPlugin from './plugins/logger';


const logger = electron.remote.getGlobal('logger');
Object.assign(console, logger.functions);
console.info('The renderer process got the logger');
Vue.use(LoggerPlugin, { logger });

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store,
  created() {
    logger.info('Main Vue component registered');
  },
  render: (h) => h(App),
}).$mount('#app');
