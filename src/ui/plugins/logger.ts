import { ElectronLog } from 'electron-log';
import { PluginObject } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $logger: ElectronLog;
  }
}

export default {
  install: (Vue, logger) => {
    Vue.prototype.$logger = logger;
  }
} as PluginObject<ElectronLog>;
