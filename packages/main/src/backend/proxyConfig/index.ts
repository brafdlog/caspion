import logger from '/@/logging/logger';
import { getProxyFromPacUrl, invalidatePacCache } from './pacFile';
import { getWindowsProxySettings } from './windowsRegistry';
import { initializeProxyAgents, tearDownProxyAgents, getCurrentProxyUrl } from './agentManager';

function normalizeProxyUrl(url: string): string {
  return url.startsWith('http') ? url : `http://${url}`;
}

async function getProxyConfiguration(): Promise<string | undefined> {
  // Check environment variables first
  const envProxyUrl = process.env.HTTP_PROXY ?? process.env.HTTPS_PROXY;
  if (envProxyUrl) {
    logger.log(`Using proxy from environment: ${envProxyUrl}`);
    return envProxyUrl;
  }

  // Check Windows Registry
  const { proxyServer, autoConfigUrl } = await getWindowsProxySettings();

  // Direct proxy server
  if (proxyServer) {
    const normalizedUrl = normalizeProxyUrl(proxyServer);
    logger.log(`Using proxy from Windows Registry: ${normalizedUrl}`);
    return normalizedUrl;
  }

  // PAC file
  if (autoConfigUrl) {
    logger.log(`Found PAC file URL in registry: ${autoConfigUrl}`);
    // Query PAC with Chromium download URL as representative for all external access
    return getProxyFromPacUrl(autoConfigUrl, 'https://storage.googleapis.com');
  }

  return undefined;
}

export async function initProxyIfNeeded(): Promise<void> {
  const proxyUrl = await getProxyConfiguration();
  if (proxyUrl) {
    initializeProxyAgents(proxyUrl);
  } else {
    logger.log('No proxy configuration found');
  }
}

export function tearDownProxy(): void {
  tearDownProxyAgents();
  invalidatePacCache();
}

export function getProxyArgs(): string[] {
  const proxyUrl = getCurrentProxyUrl();
  if (proxyUrl) {
    const urlObj = new URL(proxyUrl);
    return [`--proxy-server=${urlObj.host}`];
  }
  return [];
}
