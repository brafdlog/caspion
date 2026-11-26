import type * as browsers from '@puppeteer/browsers';
import { Browser, getInstalledBrowsers, install, resolveBuildId, uninstall } from '@puppeteer/browsers';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import downloadChromium from './downloadChromium';

vi.mock('@puppeteer/browsers', async (importOriginal) => ({
  ...(await importOriginal<typeof browsers>()),
  detectBrowserPlatform: vi.fn(() => 'linux'),
  getInstalledBrowsers: vi.fn(),
  install: vi.fn(),
  resolveBuildId: vi.fn(),
  uninstall: vi.fn(),
}));

vi.mock('fs', () => ({ existsSync: vi.fn(() => true) }));

vi.mock('/@/logging/logger', () => ({ default: { log: vi.fn(), warn: vi.fn() } }));

const INSTALL_PATH = '/user-data';

function installedBrowser(browser: Browser, buildId: string) {
  return { browser, buildId, platform: 'linux', executablePath: `/user-data/${browser}/linux-${buildId}/chrome` };
}

const legacyChromium = installedBrowser(Browser.CHROMIUM, '1649110');
const chrome146 = installedBrowser(Browser.CHROME, '146.0.7680.153');
const chrome158 = installedBrowser(Browser.CHROME, '158.0.8127.36');

let cache: ReturnType<typeof installedBrowser>[] = [];

function setCache(...browsers: ReturnType<typeof installedBrowser>[]) {
  cache = browsers;
}

describe('downloadChromium', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getInstalledBrowsers).mockImplementation(async () => [...cache] as never);
    vi.mocked(resolveBuildId).mockResolvedValue('158.0.8127.36');
    vi.mocked(install).mockImplementation(async ({ browser, buildId }) => {
      const installed = installedBrowser(browser, buildId);
      cache.push(installed);
      return installed as never;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('reuses the cached Chrome while it is on the current stable milestone', async () => {
    setCache(installedBrowser(Browser.CHROME, '158.0.8000.1'));

    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe('/user-data/chrome/linux-158.0.8000.1/chrome');
    expect(install).not.toHaveBeenCalled();
  });

  test('replaces a legacy Chromium snapshot with Chrome stable', async () => {
    setCache(legacyChromium);

    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe(chrome158.executablePath);
    expect(install).toHaveBeenCalledWith(
      expect.objectContaining({ browser: Browser.CHROME, buildId: '158.0.8127.36' }),
    );
    expect(uninstall).toHaveBeenCalledWith({
      cacheDir: INSTALL_PATH,
      browser: Browser.CHROMIUM,
      buildId: '1649110',
      platform: 'linux',
    });
  });

  test('downloads the new stable build when the cached Chrome is from an older milestone', async () => {
    setCache(chrome146);

    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe(chrome158.executablePath);
    expect(uninstall).toHaveBeenCalledTimes(1);
    expect(uninstall).toHaveBeenCalledWith(expect.objectContaining({ buildId: '146.0.7680.153' }));
  });

  test('still returns the new build when removing an old one fails', async () => {
    setCache(legacyChromium);
    vi.mocked(uninstall).mockRejectedValueOnce(new Error('EBUSY'));

    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe(chrome158.executablePath);
  });

  test('falls back to the cached browser when the stable version cannot be resolved', async () => {
    setCache(legacyChromium);
    vi.mocked(resolveBuildId).mockRejectedValue(new Error('offline'));

    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe(legacyChromium.executablePath);
    expect(install).not.toHaveBeenCalled();
  });

  test('falls back to the cached browser when the stable version lookup hangs', async () => {
    vi.useFakeTimers();
    setCache(legacyChromium);
    vi.mocked(resolveBuildId).mockReturnValue(new Promise(() => undefined));

    const result = downloadChromium(INSTALL_PATH);
    await vi.advanceTimersByTimeAsync(5000);

    await expect(result).resolves.toBe(legacyChromium.executablePath);
    expect(install).not.toHaveBeenCalled();
  });

  test('waits for a slow stable version lookup when nothing is cached', async () => {
    vi.useFakeTimers();
    setCache();
    vi.mocked(resolveBuildId).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('158.0.8127.36'), 30_000)),
    );

    const result = downloadChromium(INSTALL_PATH);
    await vi.advanceTimersByTimeAsync(30_000);

    await expect(result).resolves.toBe(chrome158.executablePath);
  });

  test('fails when the stable version cannot be resolved and nothing is cached', async () => {
    setCache();
    vi.mocked(resolveBuildId).mockRejectedValue(new Error('offline'));

    await expect(downloadChromium(INSTALL_PATH)).rejects.toThrow('offline');
  });

  test('concurrent calls share a single download', async () => {
    setCache();

    const paths = await Promise.all([downloadChromium(INSTALL_PATH), downloadChromium(INSTALL_PATH)]);

    expect(paths).toEqual([chrome158.executablePath, chrome158.executablePath]);
    expect(install).toHaveBeenCalledTimes(1);
  });

  test('retries on the next call after a failed download', async () => {
    setCache();
    vi.mocked(install).mockRejectedValueOnce(new Error('network error'));

    await expect(downloadChromium(INSTALL_PATH)).rejects.toThrow('network error');
    await expect(downloadChromium(INSTALL_PATH)).resolves.toBe(chrome158.executablePath);
  });
});
