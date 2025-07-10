import { Browser, detectBrowserPlatform, install, resolveBuildId } from '@puppeteer/browsers';
import http from 'http';
import https from 'https';
import os from 'os';
import { ProxyAgent } from 'proxy-agent';
import logger from '/@/logging/logger';

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

  // Create proxy agent if system proxy is configured
  const proxyAgent = createProxyAgent();

  // Store original global agents
  const originalHttpAgent = http.globalAgent;
  const originalHttpsAgent = https.globalAgent;

  // Set proxy agent globally if available
  if (proxyAgent) {
    http.globalAgent = proxyAgent;
    https.globalAgent = proxyAgent;
    logger.log('Using proxy agent for Chromium download');
  }

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
      if (proxyAgent) {
        http.globalAgent = originalHttpAgent;
        https.globalAgent = originalHttpsAgent;
        logger.log('Restored original HTTP agents');
      }
    });

  return downloadProm!;
}

/**
 * Creates a proxy agent based on system proxy configuration
 * Checks environment variables and system settings for proxy configuration
 */
function createProxyAgent(): ProxyAgent | undefined {
  try {
    // Check common proxy environment variables
    const proxyUrl =
      process.env.HTTPS_PROXY ??
      process.env.https_proxy ??
      process.env.HTTP_PROXY ??
      process.env.http_proxy ??
      process.env.ALL_PROXY ??
      process.env.all_proxy;

    if (proxyUrl) {
      logger.log(`Using proxy from environment variable: ${proxyUrl}`);
      // Create ProxyAgent which will automatically handle the proxy URL
      return new ProxyAgent();
    }

    // Check if NO_PROXY or no_proxy is set to disable proxy
    const noProxy = process.env.NO_PROXY ?? process.env.no_proxy;
    if (noProxy) {
      logger.log('Proxy disabled by NO_PROXY environment variable');
      return undefined;
    }

    // Only create auto-detecting proxy agent if we have reason to believe there might be a proxy
    // This avoids unnecessary overhead when no proxy is configured
    logger.log('No explicit proxy configuration found');
    return undefined;
  } catch (error) {
    logger.warn('Failed to create proxy agent:', error);
  }

  return undefined;
}
