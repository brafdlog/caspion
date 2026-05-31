import { app } from 'electron';
import updater from 'electron-updater';
import { platform } from 'node:process';
import { registerHandlers } from './handlers';
import './security-restrictions';
import { restoreOrCreateWindow } from '/@/mainWindow';
import { logAppEvent } from './logging/operationLogger';
import { scrapeAndUpdateOutputVendors } from './backend';
import { getConfig } from './backend/configManager/configManager';
import { BudgetTrackingEventEmitter } from './backend/eventEmitters/EventEmitter';

const isCliScrape = process.argv.includes('--scrape');

/**
 * Prevent electron from running multiple instances.
 * Skip this check in CLI mode to allow running from cron while GUI is open.
 */
if (!isCliScrape) {
  const isSingleInstance = app.requestSingleInstanceLock();
  if (!isSingleInstance) {
    app.quit();
    process.exit(0);
  }
  app.on('second-instance', restoreOrCreateWindow);
}

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    logAppEvent('APP_QUIT', { reason: 'all_windows_closed' });
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

/**
 * Create the application window when the background process is ready,
 * or run CLI scraping if --scrape flag is passed.
 */
app
  .whenReady()
  .then(async () => {
    logAppEvent('APP_READY', {
      version: app.getVersion(),
      platform,
      nodeVersion: process.versions.node,
      electronVersion: process.versions.electron,
      cliMode: isCliScrape,
    });

    if (isCliScrape) {
      logAppEvent('CLI_SCRAPE_START');
      try {
        const config = await getConfig();
        const eventPublisher = new BudgetTrackingEventEmitter();
        eventPublisher.onAny((eventName, eventData) => {
          console.log(`[${eventName}]`, eventData?.message ?? '');
        });
        await scrapeAndUpdateOutputVendors(config, eventPublisher);
        logAppEvent('CLI_SCRAPE_SUCCESS');
        app.quit();
      } catch (error) {
        logAppEvent('CLI_SCRAPE_FAILED', { errorMessage: (error as Error).message });
        console.error('CLI scrape failed:', error);
        app.exit(1);
      }
      return;
    }

    return restoreOrCreateWindow();
  })
  .catch((e) => {
    logAppEvent('APP_STARTUP_ERROR', { errorMessage: (e as Error).message });
    console.error('Failed create window:', e);
  });

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(module => {
//       const {default: installExtension, REACT_DEVELOPER_TOOLS} =
//         //@ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
//         typeof module.default === 'function' ? module : (module.default as typeof module);
//
//       return installExtension(REACT_DEVELOPER_TOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build or CLI mode.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `yarn compile` does. It's ok 😅
 */
if (import.meta.env.PROD && !isCliScrape) {
  app
    .whenReady()
    .then(async () => {
      logAppEvent('UPDATE_CHECK_START');
      const result = await updater.autoUpdater.checkForUpdatesAndNotify();
      if (result) {
        logAppEvent('UPDATE_AVAILABLE', { version: result.updateInfo.version });
      } else {
        logAppEvent('UPDATE_CHECK_COMPLETE', { status: 'up_to_date' });
      }
    })
    .catch((e) => {
      logAppEvent('UPDATE_CHECK_ERROR', { errorMessage: (e as Error).message });
      console.error('Failed check and install updates:', e);
    });
}

registerHandlers();
