import { app, protocol, BrowserWindow, ipcMain,} from 'electron'; // eslint-disable-line
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import logger from 'electron-log';
import { scrape, SCRAPERS } from './service/scrapers.service';
import { encryptProperty, decryptProperty } from "./service/encryption/credentials.service";
import './store'; 

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

logger.info(`Welcome to ${app.name} log`);
logger.info(`Version: ${app.getVersion()}`);

const onError = (error) => logger.error(error);
logger.catchErrors({ onError });
global.logger = logger;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);


ipcMain.on('getScrapers', (event) => {
  event.reply('getScrapers-reply', SCRAPERS);
});
ipcMain.on('encryptProperty', async (event, importer, fields) => {
  event.returnValue = await encryptProperty(importer, fields);
});
ipcMain.on('decryptProperty', (event, importer, fields) => {
  decryptProperty(importer, fields).then((decrypted) => {
    event.reply('decryptProperty-reply', decrypted)
  })
});

ipcMain.on('scrape', (event, installPath, scraperName, loginFields, showBrowser, logger, onProgress) => {
  scrape(installPath, scraperName, loginFields, showBrowser, logger, onProgress).then((result) => {
    event.reply('scrape-reply', result)
  })
});


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools();
    } catch (e) {
      logger.info('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
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
