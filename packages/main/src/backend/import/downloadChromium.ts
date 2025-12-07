import { Browser, detectBrowserPlatform, getInstalledBrowsers, install, resolveBuildId } from '@puppeteer/browsers';
import { existsSync } from 'fs';
import os from 'os';
import logger from '/@/logging/logger';

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

  if (downloadProm) return downloadProm;

  downloadProm = (async () => {
    try {
      const progressCallback = onProgress && getIntegerPercent(onProgress);
      const buildId = await resolveBuildId(Browser.CHROMIUM, platform, 'latest');

      logger.log(`Browser: ${Browser.CHROMIUM}, Platform: ${platform}, Tag: latest, BuildId: ${buildId}`);

      const installOptions = {
        cacheDir: installPath,
        browser: Browser.CHROMIUM,
        buildId,
        downloadProgressCallback: progressCallback,
      };

      const { executablePath } = await install(installOptions);

      downloadProm = null;
      logger.log('Chromium downloaded to', executablePath);
      return executablePath;
    } catch (error) {
      downloadProm = null; // Reset promise so next attempt will retry
      throw error;
    }
  })();

  return downloadProm;
}
