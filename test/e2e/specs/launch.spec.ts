import fs from 'fs';
import path from 'path';
import { testWithSpectron } from 'vue-cli-plugin-electron-builder';
import spectron from 'spectron';
import {
  Application, SpectronClient, SpectronWindow, StopServe
} from '../type';
// import Interactions from '../utils/interactions';

const screenshotsDir = './screenshots';

jest.setTimeout(1000000);

// Remove when https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/625 closed
const skip = process.env.GITHUB_ACTIONS && process.platform === 'win32';

(skip ? describe.skip : describe)('Launch', () => {
  let app: Application;
  let stopServe: StopServe;
  let browserWindow: SpectronWindow;
  let client: SpectronClient;
  // let interactions: Interactions;

  beforeAll(async () => {
    let stdout: string;
    ({ app, stopServe, stdout } = await testWithSpectron(spectron));

    // eslint-disable-next-line no-console
    console.log(stdout);
  });

  beforeEach(async () => {
    app = await app.restart();

    ({ client, browserWindow } = app);
    await client.waitUntilWindowLoaded();
    // interactions = new Interactions(client);
  });

  test('shows the proper application title', async () => {
    // Window was created
    expect(await client.getWindowCount()).toBe(1);
    // It is not minimized
    expect(await browserWindow.isMinimized()).toBe(false);
    // Window is visible
    expect(await browserWindow.isVisible()).toBe(true);
    // Size is correct
    const { width, height } = await browserWindow.getBounds();
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    // App is loaded properly
    const appElement = await client.$('#app');
    expect(await appElement.getHTML()).toMatch('Caspion');
  });

  // test.skip('Hide AddScraper components by default', async () => {
  //   const addScrapers = await interactions.getAddScrapers();
  //   // @ts-expect-error
  //   const visiblities = await Promise.all(addScrapers.map((scraper) => scraper.isVisible()));
  //   expect(visiblities).not.toContain(true);
  //   expect(visiblities).toContain(false);
  // });

  // test.skip('Show AddScraper components when clicking on AddScraper', async () => {
  //   await interactions.toggleLeftDrawer();
  //   await interactions.clickCollapseAddImporter();

  //   const addScrapers = await interactions.getAddScrapers();
  //   // @ts-expect-error
  //   const visiblities = await Promise.all(addScrapers.map((scraper) => scraper.isVisible()));
  //   expect(visiblities).not.toContain(false);
  // });

  afterEach(async () => {
    if (global.lastTest.failed) {
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const screenshotFile = path.join(screenshotsDir, `${global.lastTest.test.name.replace(/\s/g, '')}.png`);
      const imgBuffer = await browserWindow.capturePage();
      fs.writeFileSync(screenshotFile, imgBuffer.toBitmap());
    }
  });

  afterAll(async () => stopServe());
});

declare global {
  namespace NodeJS {
    interface Global {
      lastTest: any;
    }
  }
}
