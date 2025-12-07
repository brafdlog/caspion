import logger from '/@/logging/logger';
import { fetchPacFile, extractProxyFromPac, invalidatePacCache } from './pacFile';
import { getWindowsProxySettings } from './windowsRegistry';
import { initializeProxyAgents, tearDownProxyAgents, getCurrentProxyUrl } from './agentManager';

/**
 * Normalizes proxy URL to ensure it has a protocol
 */
function normalizeProxyUrl(url: string): string {
  return url.startsWith('http') ? url : `http://${url}`;
}

/**
 * Attempts to extract proxy from PAC file
 */
async function getProxyFromPacFile(pacUrl: string): Promise<string | undefined> {
  try {
    const pacContent = await fetchPacFile(pacUrl);
    const extractedProxy = extractProxyFromPac(pacContent);
    if (extractedProxy) {
      logger.log(`Extracted proxy from PAC file: ${extractedProxy}`);
      return extractedProxy;
    }
    logger.log('No proxy found in PAC file');
  } catch (error) {
    logger.log(`Failed to fetch or parse PAC file: ${error}`);
  }
  return undefined;
}

/**
 * Determines proxy configuration from environment variables or Windows Registry
 */
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
    return getProxyFromPacFile(autoConfigUrl);
  }

  return undefined;
}

/**
 * Initializes proxy configuration if available and not already set
 */
export async function initProxyIfNeeded(): Promise<void> {
  const proxyUrl = await getProxyConfiguration();
  if (proxyUrl) {
    initializeProxyAgents(proxyUrl);
  } else {
    logger.log('No proxy configuration found');
  }
}

/**
 * Tears down proxy configuration and clears cache for fresh start next time
 */
export function tearDownProxy(): void {
  tearDownProxyAgents();
  invalidatePacCache();
}

/**
 * Gets proxy arguments for Chromium
 */
export function getProxyArgs(): string[] {
  const proxyUrl = getCurrentProxyUrl();
  if (proxyUrl) {
    const urlObj = new URL(proxyUrl);
    return [`--proxy-server=${urlObj.host}`];
  }
  return [];
}
