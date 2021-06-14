import logger from './logging/logger';

const isRenderer = (process && process.type === 'renderer');
const autoUpdater = isRenderer? {} : require('electron-updater').autoUpdater; // eslint-disable-line

autoUpdater.logger = logger;
autoUpdater.autoDownload = false;

export const checkForUpdate = async () => new Promise((resolve, reject) => {
  autoUpdater.once('error', reject);
  autoUpdater.once('update-available', (info) => resolve(info));
  autoUpdater.once('update-not-available', () => resolve(false));
  autoUpdater.checkForUpdates();
});

export const downloadUpdate = async () => new Promise((resolve, reject) => {
  autoUpdater.once('error', reject);
  autoUpdater.once('update-downloaded', resolve);
  autoUpdater.downloadUpdate();
});

export const quitAndInstall = () => setImmediate(() => autoUpdater.quitAndInstall());

// autoUpdater.on('error', (error) => {
//   dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
// })

// autoUpdater.on('update-available', () => {
//   dialog.showMessageBox({
//     type: 'info',
//     title: 'Found Updates',
//     message: 'Found updates, do you want update now?',
//     buttons: ['Sure', 'No']
//   }, (buttonIndex) => {
//     if (buttonIndex === 0) {
//       autoUpdater.downloadUpdate()
//     }
//     else {
//       updater.enabled = true
//       updater = null
//     }
//   })
// })

// autoUpdater.on('update-not-available', () => {
//   dialog.showMessageBox({
//     title: 'No Updates',
//     message: 'Current version is up-to-date.'
//   })
//   updater.enabled = true
//   updater = null
// })

// autoUpdater.on('update-downloaded', () => {
//   dialog.showMessageBox({
//     title: 'Install Updates',
//     message: 'Updates downloaded, application will be quit for update...'
//   }, () => {
//     setImmediate(() => autoUpdater.quitAndInstall())
//   })
// })

// // export this to MenuItem click callback
// function checkForUpdates(menuItem, focusedWindow, event) {
//   updater = menuItem
//   updater.enabled = false
//   autoUpdater.checkForUpdates()
// }
// module.exports.checkForUpdates = checkForUpdates
