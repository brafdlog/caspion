import { createHash } from 'crypto';
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

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  const element = await page.$('#app', { strict: true });
  expect(element, 'Was unable to find the root element').toBeDefined();
  expect(
    (await element.innerHTML()).trim(),
    'Window content was empty',
  ).not.equal('');
});

test('Preload versions', async () => {
  const page = await electronApp.firstWindow();
  const versionsElement = page.locator('#process-versions');
  expect(
    await versionsElement.count(),
    'expect find one element #process-versions',
  ).toStrictEqual(1);

  const renderedVersions = (await versionsElement.innerText()).replace(
    /\s/g,
    '',
  );
  const expectedVersions = await electronApp.evaluate(() => process.versions);

  for (const expectedVersionsKey in expectedVersions) {
    expect(renderedVersions).include(
      `${expectedVersionsKey}:v${expectedVersions[expectedVersionsKey]}`,
    );
  }
});

test('Preload nodeCrypto', async () => {
  const page = await electronApp.firstWindow();

  const testString = Math.random().toString(36).slice(2, 7);

  const rawInput = page.locator('input#reactive-hash-raw-value');
  expect(
    await rawInput.count(),
    'expect find one element input#reactive-hash-raw-value',
  ).toStrictEqual(1);

  const hashedInput = page.locator('input#reactive-hash-hashed-value');
  expect(
    await hashedInput.count(),
    'expect find one element input#reactive-hash-hashed-value',
  ).toStrictEqual(1);

  await rawInput.fill(testString);
  const renderedHash = await hashedInput.inputValue();
  const expectedHash = createHash('sha256').update(testString).digest('hex');
  expect(renderedHash).toEqual(expectedHash);
});