import logger from '/@/logging/logger';
import { getProxyFromPacUrl, invalidatePacCache } from './pacFile';
import { getWindowsProxySettings } from './windowsRegistry';
import { initializeProxyAgents, tearDownProxyAgents, getCurrentProxyUrl, getCurrentPacUrl } from './agentManager';

function normalizeProxyUrl(url: string): string {
  // If the URL already has a scheme (e.g., http, https, socks4, socks5), return it as-is.
  // Otherwise, assume an HTTP proxy and prepend "http://".
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
    return url;
  }
  return `http://${url}`;
}

interface ProxyConfig {
  proxyUrl?: string;
  pacUrl?: string;
}

async function getProxyConfiguration(): Promise<ProxyConfig> {
  // Check environment variables first
  const envProxyUrl =
    process.env.HTTP_PROXY ?? process.env.HTTPS_PROXY ?? process.env.http_proxy ?? process.env.https_proxy;

  if (envProxyUrl) {
    logger.log(`Using proxy from environment: ${envProxyUrl}`);
    return { proxyUrl: envProxyUrl };
  }

  // Check Windows Registry
  const { proxyServer, autoConfigUrl } = await getWindowsProxySettings();

  // Direct proxy server
  if (proxyServer) {
    const normalizedUrl = normalizeProxyUrl(proxyServer);
    logger.log(`Using proxy from Windows Registry: ${normalizedUrl}`);
    return { proxyUrl: normalizedUrl };
  }

  // PAC file
  if (autoConfigUrl) {
    logger.log(`Found PAC file URL in registry: ${autoConfigUrl}`);
    // Query PAC with Chromium download URL as representative for all external access
    const proxyUrl = await getProxyFromPacUrl(autoConfigUrl, 'https://storage.googleapis.com');
    return { proxyUrl, pacUrl: autoConfigUrl };
  }

  return {};
}

export async function initProxyIfNeeded(): Promise<void> {
  const config = await getProxyConfiguration();
  if (config.proxyUrl) {
    initializeProxyAgents(config.proxyUrl, config.pacUrl);
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
  const pacUrl = getCurrentPacUrl();
  const args: string[] = [];

  if (pacUrl) {
    args.push(`--proxy-pac-url=${pacUrl}`);
  } else if (proxyUrl) {
    const urlObj = new URL(proxyUrl);
    args.push(`--proxy-server=${urlObj.host}`);
  }

  // Add bypass list from NO_PROXY env var if explicitly set
  const noProxy = process.env.NO_PROXY ?? process.env.no_proxy;
  if (noProxy) {
    args.push(`--proxy-bypass-list=${noProxy}`);
  }

  return args;
}
