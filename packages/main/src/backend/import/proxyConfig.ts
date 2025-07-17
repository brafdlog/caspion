import http from 'http';
import https from 'https';
import { ProxyAgent } from 'proxy-agent';
import logger from '/@/logging/logger';

// Store original global agents
let originalHttpAgent: typeof http.globalAgent | null = null;
let originalHttpsAgent: typeof https.globalAgent | null = null;
let currentProxyAgent: ProxyAgent | null = null;

/**
 * Gets the proxy configuration from environment variables
 * Returns the proxy URL if found, undefined if no proxy or if disabled by NO_PROXY
 */
export function getProxyConfiguration(): { proxyUrl?: string; isDisabled: boolean } {
  // Check if NO_PROXY or no_proxy is set to disable proxy
  const noProxy = process.env.NO_PROXY ?? process.env.no_proxy;
  if (noProxy) {
    return { isDisabled: true };
  }

  // Check common proxy environment variables
  const proxyUrl =
    process.env.HTTPS_PROXY ??
    process.env.https_proxy ??
    process.env.HTTP_PROXY ??
    process.env.http_proxy ??
    process.env.ALL_PROXY ??
    process.env.all_proxy;

  return { proxyUrl, isDisabled: false };
}

/**
 * Checks if proxy needs to be configured based on environment variables
 */
function isProxyNeedConfiguration(): boolean {
  const { proxyUrl, isDisabled } = getProxyConfiguration();

  if (isDisabled) {
    logger.log('Proxy disabled by NO_PROXY environment variable');
    return false;
  }

  return !!proxyUrl;
}

/**
 * Initializes proxy configuration if needed
 * Sets up global HTTP/HTTPS agents with proxy configuration
 */
export function initProxyIfNeeded(): void {
  if (!isProxyNeedConfiguration()) {
    return;
  }

  const { proxyUrl } = getProxyConfiguration();

  if (!proxyUrl) {
    return;
  }

  try {
    // Store original global agents before modifying them
    originalHttpAgent = http.globalAgent;
    originalHttpsAgent = https.globalAgent;

    // Create and set proxy agent
    currentProxyAgent = new ProxyAgent();
    http.globalAgent = currentProxyAgent;
    https.globalAgent = currentProxyAgent;

    logger.log(`Using proxy from environment variable: ${proxyUrl}`);
  } catch (error) {
    logger.warn('Failed to initialize proxy agent:', error);
  }
}

/**
 * Tears down proxy configuration and restores original global agents
 * Should be called in finally blocks to ensure cleanup
 */
export function tearDownProxy(): void {
  if (currentProxyAgent && originalHttpAgent && originalHttpsAgent) {
    // Restore original global agents
    http.globalAgent = originalHttpAgent;
    https.globalAgent = originalHttpsAgent;

    // Reset stored references
    originalHttpAgent = null;
    originalHttpsAgent = null;
    currentProxyAgent = null;

    logger.log('Restored original HTTP agents');
  }
}

/**
 * Gets proxy arguments for Chromium browser
 * Returns array of arguments to pass to browser for proxy configuration
 */
export function getProxyArgs(): string[] {
  const { proxyUrl, isDisabled } = getProxyConfiguration();

  if (isDisabled) {
    logger.log('Proxy disabled for scraping by NO_PROXY environment variable');
    return [];
  }

  if (proxyUrl) {
    logger.log(`Using proxy for scraping: ${proxyUrl}`);
    return [`--proxy-server=${proxyUrl}`];
  }

  return [];
}
