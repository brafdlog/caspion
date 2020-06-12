import fs from 'fs';
import path from 'path';
import { testWithSpectron } from 'vue-cli-plugin-electron-builder';
import scrapers from '../../../src/modules/importers';
import Interactions from '../utils/interactions';

const screenshotsDir = './screenshots';

jest.setTimeout(100000);

// Remove when https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/625 closed
// const skip = process.env.GITHUB_ACTIONS && process.platform === 'win32';
const skip = true;

(skip ? describe.skip : describe)('Launch', () => {
  let app;
  let stopServe;
  let browserWindow;
  let client;
  let interactions;

  beforeAll(async () => {
    let stdout;
    ({ app, stopServe, stdout } = await testWithSpectron());

    // eslint-disable-next-line no-console
    console.log(stdout);
  });

  beforeEach(async () => {
    app = await app.restart();

    ({ client, browserWindow } = app);
    await client.waitUntilWindowLoaded();
    interactions = new Interactions(client);
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
    expect(await client.getHTML('#app')).toMatch(/Israeli Bank Scrapers Desktop/);
  });

  test('should be AddScraper per scraper', async () => {
    const addScrapers = await interactions.getAddScrapers();
    expect(addScrapers.length).toEqual(scrapers.length);
  });

  test('Hide AddScraper components by default', async () => {
    const addScrapers = await interactions.getAddScrapers();
    const visiblities = await Promise.all(addScrapers.map((scraper) => scraper.isVisible()));
    expect(visiblities).not.toContain(true);
    expect(visiblities).toContain(false);
  });

  test('Show AddScraper components when clicking on AddScraper', async () => {
    await interactions.toggleLeftDrawer();
    await interactions.clickCollapseAddImporter();

    const addScrapers = await interactions.getAddScrapers();
    const visiblities = await Promise.all(addScrapers.map((scraper) => scraper.isVisible()));
    expect(visiblities).not.toContain(false);
  });

  afterEach(async () => {
    if (global.lastTest.failed) {
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const screenshotFile = path.join(screenshotsDir, `${global.lastTest.test.name.replace(/\s/g, '')}.png`);
      const imgBuffer = await browserWindow.capturePage();
      fs.writeFileSync(screenshotFile, imgBuffer);
    }
  });

  afterAll(async () => stopServe());
});
