import ElectronLog from "electron-log";

declare global {
  var SENTRY_DSN: string
  var GOOGLE_CLIENT_ID: string
  var GOOGLE_CLIENT_SECRET: string
  const SOURCE_COMMIT_SHORT: string
  namespace NodeJS {
    interface Global {
      logger: ElectronLog.ElectronLog & {
        default: ElectronLog.ElectronLog;
      }
    }
  }
}
