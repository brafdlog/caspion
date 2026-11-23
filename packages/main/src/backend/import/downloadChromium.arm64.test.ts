import type * as fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  isLinuxArm64: true,
  executables: new Set<string>(),
  cachedBrowsers: [] as { browser: string; platform: string; buildId: string; executablePath: string }[],
}));

vi.mock('/@/platform', () => ({
  get isLinuxArm64() {
    return state.isLinuxArm64;
  },
}));

vi.mock('/@/logging/logger', () => ({
  default: { log: vi.fn(), warn: vi.fn() },
}));

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof fs>();
  return {
    ...actual,
    existsSync: vi.fn(() => true),
    accessSync: vi.fn((path: string) => {
      if (!state.executables.has(path)) throw new Error(`EACCES: ${path}`);
    }),
  };
});

vi.mock('@puppeteer/browsers', () => ({
  Browser: { CHROMIUM: 'chromium' },
  detectBrowserPlatform: vi.fn(() => 'linux'),
  getInstalledBrowsers: vi.fn(async () => state.cachedBrowsers),
  resolveBuildId: vi.fn(async () => '1729495'),
  install: vi.fn(async () => ({ executablePath: '/cache/chromium/linux-1729495/chrome-linux/chrome' })),
}));

import { getInstalledBrowsers, install } from '@puppeteer/browsers';
import downloadChromium from './downloadChromium';

describe('downloadChromium on linux-arm64', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.isLinuxArm64 = true;
    state.executables = new Set();
    state.cachedBrowsers = [];
  });

  test('uses the system Chromium instead of downloading', async () => {
    state.executables.add('/usr/bin/chromium');

    await expect(downloadChromium('/cache')).resolves.toBe('/usr/bin/chromium');
    expect(install).not.toHaveBeenCalled();
  });

  test('prefers the real binary over the wrapper script', async () => {
    state.executables.add('/usr/bin/chromium');
    state.executables.add('/usr/lib/chromium/chromium');

    await expect(downloadChromium('/cache')).resolves.toBe('/usr/lib/chromium/chromium');
  });

  test('ignores a cached x86-64 download', async () => {
    state.executables.add('/usr/lib/chromium/chromium');
    state.cachedBrowsers = [
      { browser: 'chromium', platform: 'linux', buildId: '1729495', executablePath: '/cache/x86/chrome' },
    ];

    await expect(downloadChromium('/cache')).resolves.toBe('/usr/lib/chromium/chromium');
    expect(getInstalledBrowsers).not.toHaveBeenCalled();
  });

  test('throws an actionable error when no system Chromium is installed', async () => {
    await expect(downloadChromium('/cache')).rejects.toThrow(/sudo apt install chromium/);
    expect(install).not.toHaveBeenCalled();
  });

  test('still downloads on other platforms', async () => {
    state.isLinuxArm64 = false;
    state.executables.add('/usr/lib/chromium/chromium');

    await expect(downloadChromium('/cache')).resolves.toBe('/cache/chromium/linux-1729495/chrome-linux/chrome');
    expect(install).toHaveBeenCalledOnce();
  });
});
