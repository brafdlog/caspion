import { Browser, detectBrowserPlatform, install, resolveBuildId } from '@puppeteer/browsers';
import os from 'os';
import logger from '/@/logging/logger';
import { initProxyIfNeeded, tearDownProxy } from './proxyConfig';

type PuppeteerProgressCallback = (downloadBytes: number, totalBytes: number) => void;
type PercentCallback = (percent: number) => void;

let isCached = true;
const getIntegerPercent = (callback: PercentCallback): PuppeteerProgressCallback => {
  isCached = false;
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

  const progressCallback = onProgress && getIntegerPercent(onProgress);

  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
  }
  const buildId = await resolveBuildId(Browser.CHROMIUM, platform, 'latest');

  logger.log(`Browser: ${Browser.CHROMIUM}, Platform: ${platform}, Tag: stable, BuildId: ${buildId}`);

  // Initialize proxy if needed
  initProxyIfNeeded();

  const installOptions = {
    cacheDir: installPath,
    browser: Browser.CHROMIUM,
    buildId,
    downloadProgressCallback: progressCallback,
  };

  downloadProm = install(installOptions)
    .then(({ executablePath }) => {
      downloadProm = null;
      if (!isCached) {
        logger.log('Chromium downloaded to', executablePath);
      } else {
        logger.log('Chromium cached at', executablePath);
      }
      isCached = true;
      return executablePath;
    })
    .finally(() => {
      // Restore original global agents
      tearDownProxy();
    });

  return downloadProm!;
}
