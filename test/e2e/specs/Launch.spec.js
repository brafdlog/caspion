import fs from 'fs';
import { SCRAPERS } from 'israeli-bank-scrapers-core';
import path from 'path';
import { testWithSpectron } from 'vue-cli-plugin-electron-builder';
import Interactions from '../utils/interactions';

const screenshotsDir = './screenshots';

jest.setTimeout(200000);

// Remove when https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/625 closed
const skip = process.env.GITHUB_ACTIONS && process.platform === 'win32';

(skip ? describe.skip : describe)('Launch', () => {
  let stopServe;
  let win;
  let client;
  let interactions;

  beforeEach(async () => {
    let app;
    ({ app, stopServe } = await testWithSpectron());

    // Wait for dev server to start
    win = app.browserWindow;
    ({ client } = app);
    interactions = new Interactions(client);
  });

  test('shows the proper application title', async () => {
    // Window was created
    expect(await client.getWindowCount()).toBe(1);
    // It is not minimized
    expect(await win.isMinimized()).toBe(false);
    // Window is visible
    expect(await win.isVisible()).toBe(true);
    // Size is correct
    const { width, height } = await win.getBounds();
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    // App is loaded properly
    expect(await client.getHTML('#app')).toMatch(/Israeli Bank Scrapers Desktop/);
  });

  test('should be AddScraper per scraper', async () => {
    const addScrapers = await interactions.getAddScrapers();
    expect(addScrapers.length).toEqual(Object.keys(SCRAPERS).length);
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
      const imgBuffer = await win.capturePage();
      fs.writeFileSync(screenshotFile, imgBuffer);
    }
    await stopServe();
  });
});
