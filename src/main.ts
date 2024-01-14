import Vue, { ref, h } from 'vue';
import logger from './logging/logger';
import Sentry from './logging/sentry';
import App from './ui/components/App.vue';
import SplashScreen from './ui/components/SplashScreen.vue';
import vuetify from './ui/plugins/vuetify';
import router from './ui/router';
import store from './ui/store';

Sentry.initializeReporter();

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store: store.original,

  name: APP_NAME,

  setup(_, { root }) {
    logger.info('Vue started');
    const loaded = ref(false);
    root.$store.restored.then(() => {
      loaded.value = true;
    });

    return () => (loaded.value ? h(App) : h(SplashScreen));
  }
}).Use(vuetify).$mount('#app');
