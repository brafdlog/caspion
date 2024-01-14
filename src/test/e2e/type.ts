import { Server } from 'vue-cli-plugin-electron-builder';

export type Application = Server['app']
export type StopServe = Server['stopServe']
export type SpectronWindow = Server['app']['browserWindow'];
export type SpectronClient = Server['app']['client'];
