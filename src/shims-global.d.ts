import ElectronLog from "electron-log";
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  namespace NodeJS {
    interface Global {
      logger: ElectronLog.ElectronLog & {
        default: ElectronLog.ElectronLog;
      }
    }
  }
}
