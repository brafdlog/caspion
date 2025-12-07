import { ProxyAgent } from 'proxy-agent';
import type { Agent as HttpAgent } from 'http';
import type { Agent as HttpsAgent } from 'https';
import http from 'http';
import https from 'https';
import { setGlobalDispatcher, ProxyAgent as UndiciProxyAgent, Agent as UndiciAgent } from 'undici';
import logger from '/@/logging/logger';

interface ProxyState {
  proxyUrl: string;
  originalHttpAgent: HttpAgent;
  originalHttpsAgent: HttpsAgent;
  proxyAgent: ProxyAgent;
}

let proxyState: ProxyState | null = null;

/**
 * Initializes global proxy agents for HTTP/HTTPS and fetch()
 */
export function initializeProxyAgents(proxyUrl: string): void {
  if (proxyState?.proxyUrl === proxyUrl) {
    logger.log(`Proxy already initialized with ${proxyUrl}`);
    return;
  }

  logger.log(`Initializing proxy agents with ${proxyUrl}`);

  // Set environment variables for @puppeteer/browsers
  process.env.HTTP_PROXY = proxyUrl;
  process.env.HTTPS_PROXY = proxyUrl;

  // Store original agents and create proxy agent
  const proxyAgent = new ProxyAgent({ getProxyForUrl: () => proxyUrl });

  proxyState = {
    proxyUrl,
    originalHttpAgent: http.globalAgent,
    originalHttpsAgent: https.globalAgent,
    proxyAgent,
  };

  // Set proxy agents globally
  http.globalAgent = proxyAgent;
  https.globalAgent = proxyAgent;

  // Configure undici for fetch() API
  const undiciProxyAgent = new UndiciProxyAgent(proxyUrl);
  setGlobalDispatcher(undiciProxyAgent);
}

/**
 * Restores original global agents and clears proxy configuration
 */
export function tearDownProxyAgents(): void {
  if (!proxyState) {
    return;
  }

  logger.log('Tearing down proxy agents');

  // Restore original agents
  http.globalAgent = proxyState.originalHttpAgent;
  https.globalAgent = proxyState.originalHttpsAgent;

  // Clear environment variables
  delete process.env.HTTP_PROXY;
  delete process.env.HTTPS_PROXY;

  // Reset undici dispatcher to default
  setGlobalDispatcher(new UndiciAgent());

  // Clear state
  proxyState = null;
}

/**
 * Gets current proxy URL if configured
 */
export function getCurrentProxyUrl(): string | null {
  return proxyState?.proxyUrl ?? null;
}
