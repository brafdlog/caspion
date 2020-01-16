const { testWithSpectron } = require('vue-cli-plugin-electron-builder');

jest.setTimeout(100000);

describe('Launch', () => {
  let app;
  let stopServe;

  beforeEach(async () => {
    ({ app, stopServe } = await testWithSpectron());
  });

  test('shows the proper application title', async () => {
    // Wait for dev server to start
    const win = app.browserWindow;
    const { client } = app;

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
      /israeli-bank-scrapers-desktop/.test(
        await client.getHTML('#app'),
      ),
    ).toBe(true);
  });

  afterEach(async () => {
    await stopServe();
  });
});
