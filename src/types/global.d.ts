import ElectronLog from "electron-log";

declare global {
  const SENTRY_DSN: string
  const GOOGLE_CLIENT_ID: string
  const GOOGLE_CLIENT_SECRET: string
  const SEGMENT_WRITE_KEY: string
  const SOURCE_COMMIT_SHORT: string
  const APP_NAME: string
  const DISCORD_CHANNEL: string
  namespace NodeJS {
    interface Global {
      logger: ElectronLog.ElectronLog & {
        default: ElectronLog.ElectronLog;
      }
    }
  }
}
