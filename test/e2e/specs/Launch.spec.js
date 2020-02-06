import { testWithSpectron } from 'vue-cli-plugin-electron-builder';
import Interactions from '../utils/interactions';

jest.setTimeout(200000);

// Remove when https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/625 closed
const skip = process.env.GITHUB_ACTIONS && process.platform === 'win32';

(skip ? describe.skip : describe)('Launch', () => {
  let stopServe;
  let win;
  let client;

  beforeEach(async () => {
    let app;
    ({ app, stopServe } = await testWithSpectron());

    // Wait for dev server to start
    win = app.browserWindow;
    ({ client } = app);
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
    expect(
      /Israeli Bank Scrapers Desktop/.test(
        await client.getHTML('#app'),
      ),
    ).toBe(true);
  });

  test('Show AddScraper components when clicking on AddScraper', async () => {
    const interactions = new Interactions(client);

    const addScrapers = await interactions.getAddScrapers();
    expect(addScrapers.map((component) => component.isDisplayed())).not.toContain(false);
    await interactions.clickCollapseAddImporter();
  });

  afterEach(async () => {
    await stopServe();
  });
});
