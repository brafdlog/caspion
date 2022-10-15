import * as remote from '@electron/remote/main';
import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { registerHandlers } from './handlers';
import logger from './logging/logger';
import Sentry from './logging/sentry';

remote.initialize();
Sentry.initializeReporter();

const isDevelopment = process.env.NODE_ENV !== 'production';
let useReactUI = true;

function toggleUseReactUI() {
  useReactUI = !useReactUI;
  loadUIIntoWindow();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1152,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as
        | boolean
        | undefined
    },
  });
  loadUIIntoWindow();

  // initialize electron event handlers
  registerHandlers();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function loadUIIntoWindow() {
  if (mainWindow == null) {
    throw Error('Main window is null');
  }
  // Workaround from https://github.com/electron/electron/issues/19554
  // @ts-ignore
  const loadURL = (url) => setTimeout(() => mainWindow.loadURL(url), 100);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    const uiDevUrl = useReactUI ? 'http://localhost:3000' : process.env.WEBPACK_DEV_SERVER_URL;
    loadURL(uiDevUrl);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    // eslint-disable-next-line no-lonely-if
    if (useReactUI) {
      mainWindow.loadFile('../ui-react/build/index.html');
    } else {
      // TODO remove when vue code is removed
      createProtocol('app');
      loadURL('app://./index.html');
    }
  }

  // initialize electron event handlers
  registerHandlers();
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode,you may uncomment these lines
    // In addition, if the linked issue is closed,
    // you can upgrade electron and uncomment these lines
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      logger.info('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

ipcMain.on('toggleUiVersion', async (_event, _args) => {
  toggleUseReactUI();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
