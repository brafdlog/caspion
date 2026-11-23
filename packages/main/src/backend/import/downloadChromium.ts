import {
  Browser,
  ChromeReleaseChannel,
  detectBrowserPlatform,
  getInstalledBrowsers,
  install,
  resolveBuildId,
  uninstall,
} from '@puppeteer/browsers';
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

const getMilestone = (buildId: string) => buildId.split('.')[0];

// The version lookup normally takes well under a second, but @puppeteer/browsers sets no request timeout.
const RESOLVE_TIMEOUT_MS = 5000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

let pending: Promise<string> | null = null;

export default function downloadChromium(installPath: string, onProgress?: PercentCallback): Promise<string> {
  pending ??= getChrome(installPath, onProgress).finally(() => {
    pending = null;
  });
  return pending;
}

// Follows the Chrome stable channel instead of keeping the first downloaded build forever:
// banks' bot protection can start blocking a specific outdated or pre-release build.
// A cached build is reused until a new milestone ships (every 4 weeks), so there is at most one download per release.
async function getChrome(installPath: string, onProgress?: PercentCallback): Promise<string> {
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
  }

  const cachedBrowsers = (await getInstalledBrowsers({ cacheDir: installPath })).filter(
    (b) => b.platform === platform && existsSync(b.executablePath),
  );
  const cachedChrome = cachedBrowsers.find((b) => b.browser === Browser.CHROME);
  const fallback = cachedChrome ?? cachedBrowsers[0];

  let buildId: string;
  try {
    const resolving = resolveBuildId(Browser.CHROME, platform, ChromeReleaseChannel.STABLE);
    // With a cached browser to fall back on, a hanging connection must not stall the scrape.
    // Without one, the scrape needs the download anyway, so a slow connection gets to finish.
    buildId = await (fallback ? withTimeout(resolving, RESOLVE_TIMEOUT_MS) : resolving);
  } catch (error) {
    if (!fallback) throw error;
    logger.warn('Could not resolve the latest Chrome version, using cached browser at', fallback.executablePath, error);
    return fallback.executablePath;
  }

  if (cachedChrome && getMilestone(cachedChrome.buildId) === getMilestone(buildId)) {
    logger.log('Using cached Chrome at', cachedChrome.executablePath);
    return cachedChrome.executablePath;
  }

  logger.log(`Browser: ${Browser.CHROME}, Platform: ${platform}, Channel: stable, BuildId: ${buildId}`);

  const { executablePath } = await install({
    cacheDir: installPath,
    browser: Browser.CHROME,
    buildId,
    downloadProgressCallback: onProgress && getIntegerPercent(onProgress),
  });
  logger.log('Chrome downloaded to', executablePath);

  await removeOtherBrowsers(installPath, buildId);
  return executablePath;
}

async function removeOtherBrowsers(installPath: string, keepBuildId: string) {
  const installedBrowsers = await getInstalledBrowsers({ cacheDir: installPath });
  for (const { browser, buildId, platform } of installedBrowsers) {
    if (browser === Browser.CHROME && buildId === keepBuildId) continue;
    try {
      await uninstall({ cacheDir: installPath, browser, buildId, platform });
      logger.log(`Removed outdated browser ${browser} ${buildId}`);
    } catch (error) {
      logger.warn(`Could not remove outdated browser ${browser} ${buildId}`, error);
    }
  }
}
