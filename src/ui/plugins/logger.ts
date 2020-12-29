export default {
  install(Vue, { logger }) {
    Vue.prototype.$logger = logger;
  }
};
