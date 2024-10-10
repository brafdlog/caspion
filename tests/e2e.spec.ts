import { type BrowserWindow } from 'electron';
import {
  _electron as electron,
  type ElectronApplication,
  type JSHandle,
} from 'playwright';
import { afterAll, beforeAll, expect, test } from 'vitest';

let electronApp: ElectronApplication;

beforeAll(async () => {
  electronApp = await electron.launch({ args: ['.'] });
});

afterAll(async () => {
  await electronApp.close();
});

test('Main window state', async () => {
  const page = await electronApp.firstWindow();
  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
  const windowState = await window.evaluate(
    (
      mainWindow,
    ): Promise<{
      isVisible: boolean;
      isDevToolsOpened: boolean;
      isCrashed: boolean;
    }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else mainWindow.once('ready-to-show', () => resolve(getState()));
      });
    },
  );

  expect(windowState.isCrashed, 'The app has crashed').toBeFalsy();
  expect(windowState.isVisible, 'The main window was not visible').toBeTruthy();
  expect(
    windowState.isDevToolsOpened,
    'The DevTools panel was open',
  ).toBeFalsy();
});

test('Main window web content', async () => {
  const page = await electronApp.firstWindow();
  const element = await page.$('#app', { strict: true });
  expect(element, 'Was unable to find the root element').toBeDefined();
  expect(
    (await element.innerHTML()).trim(),
    'Window content was empty',
  ).not.equal('');
});
