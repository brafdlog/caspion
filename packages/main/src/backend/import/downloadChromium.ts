import { Browser, detectBrowserPlatform, getInstalledBrowsers, install, resolveBuildId } from '@puppeteer/browsers';
import { accessSync, constants, existsSync } from 'fs';
import os from 'os';
import logger from '/@/logging/logger';
import { isLinuxArm64 } from '/@/platform';

// Native distro Chromium binaries, preferring the real binary over wrapper scripts.
const SYSTEM_CHROMIUM_CANDIDATES = [
  '/usr/lib/chromium/chromium',
  '/usr/lib/chromium-browser/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
];

function findSystemChromium(): string | undefined {
  return SYSTEM_CHROMIUM_CANDIDATES.find((candidate) => {
    try {
      accessSync(candidate, constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
}

type PuppeteerProgressCallback = (downloadBytes: number, totalBytes: number) => void;
type PercentCallback = (percent: number) => void;

const getIntegerPercent = (callback: PercentCallback): PuppeteerProgressCallback => {
  let prevPercent = -1;

  return (downloadBytes: number, totalBytes: number) => {
    const p = Math.floor((downloadBytes / totalBytes) * 100);
    if (p > prevPercent) {
      prevPercent = p;
      callback(p);
    }
  };
};

let downloadProm: ReturnType<typeof downloadChromium> | null = null;

export default async function downloadChromium(installPath: string, onProgress?: PercentCallback): Promise<string> {
  if (downloadProm) return downloadProm;

  // @puppeteer/browsers reports every Linux machine as x86-64 and there are no official
  // linux-arm64 Chromium builds, so a download would produce a binary that cannot run.
  if (isLinuxArm64) {
    const systemChromium = findSystemChromium();
    if (systemChromium) {
      logger.log('Using system Chromium on linux-arm64 at', systemChromium);
      return systemChromium;
    }
    throw new Error(
      'No Chromium found for linux-arm64. Install it (e.g. `sudo apt install chromium`) ' +
        'or set the Chromium path in the general settings.',
    );
  }

  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
  }

  // Check for existing cached Chromium first
  const installedBrowsers = await getInstalledBrowsers({ cacheDir: installPath });
  const existingChromium = installedBrowsers.find(
    (b) => b.browser === Browser.CHROMIUM && b.platform === platform && existsSync(b.executablePath),
  );

  if (existingChromium) {
    logger.log('Using cached Chromium at', existingChromium.executablePath);
    return existingChromium.executablePath;
  }

  // No cached version found, proceed with download
  logger.log('No cached Chromium found, downloading...');

  const progressCallback = onProgress && getIntegerPercent(onProgress);
  const buildId = await resolveBuildId(Browser.CHROMIUM, platform, 'latest');

  logger.log(`Browser: ${Browser.CHROMIUM}, Platform: ${platform}, Tag: latest, BuildId: ${buildId}`);

  downloadProm = install({
    cacheDir: installPath,
    browser: Browser.CHROMIUM,
    buildId,
    downloadProgressCallback: progressCallback,
  }).then(({ executablePath }) => {
    downloadProm = null;
    logger.log('Chromium downloaded to', executablePath);
    return executablePath;
  });

  return downloadProm!;
}
