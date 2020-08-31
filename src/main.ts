import VueCompositionAPI, { h, ref } from '@vue/composition-api';
import electron from 'electron';
import Vue from 'vue';
import App from './components/App.vue';
import FormField from './components/shared/FormField';
import SplashScreen from './components/SplashScreen.vue';
import { initializeReporter } from './modules/reporting';
import LoggerPlugin from './plugins/logger';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

initializeReporter();

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});

const logger = electron.remote.getGlobal('logger');
logger.info('The renderer process got the logger');
Vue.use(LoggerPlugin, { logger });

Vue.use(VueCompositionAPI);

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.component('form-field', FormField);

new Vue({
  router,
  store,
  vuetify,

  name: 'IsraeliBankScrapersDesktop',

  setup(_, { root }) {
    const loaded = ref(false);
    root.$store.restored.then(() => {
      loaded.value = true;
    });

    return () => (loaded.value ? h(App) : h(SplashScreen));
  }
}).$mount('#app');
