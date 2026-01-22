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
  originalHttpProxy: string | undefined;
  originalHttpsProxy: string | undefined;
}

let proxyState: ProxyState | null = null;
let isInitializing = false;
let isTearingDown = false;

export function initializeProxyAgents(proxyUrl: string): void {
  if (isInitializing) {
    logger.log('Proxy initialization already in progress, ignoring concurrent call');
    return;
  }

  if (isTearingDown) {
    throw new Error('Cannot initialize proxy while teardown is in progress');
  }

  if (proxyState?.proxyUrl === proxyUrl) {
    logger.log(`Proxy already initialized with ${proxyUrl}`);
    return;
  }

  isInitializing = true;

  try {
    // Clean up previous proxy before setting up a new one to avoid resource leaks
    if (proxyState) {
      tearDownProxyAgents();
    }

    logger.log(`Initializing proxy agents with ${proxyUrl}`);

    // Store original environment variables so they can be restored later
    const originalHttpProxy = process.env.HTTP_PROXY;
    const originalHttpsProxy = process.env.HTTPS_PROXY;

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
      originalHttpProxy,
      originalHttpsProxy,
    };

    // Set proxy agents globally
    http.globalAgent = proxyAgent;
    https.globalAgent = proxyAgent;

    // Configure undici for fetch() API
    const undiciProxyAgent = new UndiciProxyAgent(proxyUrl);
    setGlobalDispatcher(undiciProxyAgent);
  } finally {
    isInitializing = false;
  }
}

export function tearDownProxyAgents(): void {
  if (isTearingDown) {
    logger.log('Proxy teardown already in progress, ignoring concurrent call');
    return;
  }

  if (!proxyState) {
    return;
  }

  isTearingDown = true;

  try {
    logger.log('Tearing down proxy agents');

    // Restore original agents
    http.globalAgent = proxyState.originalHttpAgent;
    https.globalAgent = proxyState.originalHttpsAgent;

    // Restore original environment variables instead of deleting them
    if (proxyState.originalHttpProxy !== undefined) {
      process.env.HTTP_PROXY = proxyState.originalHttpProxy;
    } else {
      delete process.env.HTTP_PROXY;
    }

    if (proxyState.originalHttpsProxy !== undefined) {
      process.env.HTTPS_PROXY = proxyState.originalHttpsProxy;
    } else {
      delete process.env.HTTPS_PROXY;
    }

    // Reset undici dispatcher to default
    setGlobalDispatcher(new UndiciAgent());

    // Clear state
    proxyState = null;
  } finally {
    isTearingDown = false;
  }
}

export function getCurrentProxyUrl(): string | null {
  return proxyState?.proxyUrl ?? null;
}
