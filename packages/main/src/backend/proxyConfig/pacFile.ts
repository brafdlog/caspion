import http from 'http';
import https from 'https';
import logger from '/@/logging/logger';
import { createPacResolver } from 'pac-resolver';
import { getQuickJS } from '@tootallnate/quickjs-emscripten';

const PAC_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PAC_FETCH_TIMEOUT_MS = 10000; // 10 seconds
const MAX_PAC_FILE_SIZE = 1024 * 1024; // 1MB

interface CachedProxy {
  proxy: string | undefined;
  pacUrl: string;
  timestamp: number;
}

let cachedProxy: CachedProxy | null = null;

export async function getProxyFromPacUrl(pacUrl: string, targetUrl: string): Promise<string | undefined> {
  // Return cached proxy if valid
  if (cachedProxy?.pacUrl === pacUrl) {
    const age = Date.now() - cachedProxy.timestamp;
    if (age < PAC_CACHE_TTL_MS) {
      logger.log(`Using cached proxy from PAC (age: ${Math.round(age / 1000)}s)`);
      return cachedProxy.proxy;
    }
  }

  try {
    // Fetch PAC file
    const pacContent = await fetchPacFile(pacUrl);

    // Evaluate PAC file to get proxy
    const proxy = await evaluatePacFile(pacContent, targetUrl);

    // Cache the result
    cachedProxy = {
      proxy,
      pacUrl,
      timestamp: Date.now(),
    };

    return proxy;
  } catch (error) {
    logger.log(`Failed to get proxy from PAC file: ${error}`);
    return undefined;
  }
}

async function fetchPacFile(pacUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let urlObj: URL;
    try {
      urlObj = new URL(pacUrl);
    } catch (err) {
      reject(new Error(`Invalid PAC URL: ${pacUrl}`));
      return;
    }

    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.get(pacUrl, { timeout: PAC_FETCH_TIMEOUT_MS }, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`PAC file fetch failed with status ${res.statusCode}`));
        return;
      }

      let data = '';
      let totalSize = 0;

      res.on('data', (chunk) => {
        totalSize += chunk.length;
        if (totalSize > MAX_PAC_FILE_SIZE) {
          req.destroy();
          reject(new Error(`PAC file exceeds maximum size of ${MAX_PAC_FILE_SIZE} bytes`));
          return;
        }
        data += chunk;
      });

      res.on('end', () => resolve(data));
    });

    req.on('error', (err) => {
      req.destroy();
      reject(new Error(`PAC file fetch failed: ${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`PAC file fetch timeout after ${PAC_FETCH_TIMEOUT_MS}ms`));
    });
  });
}

async function evaluatePacFile(pacContent: string, targetUrl: string): Promise<string | undefined> {
  // Initialize QuickJS WASM module
  const QuickJS = await getQuickJS();

  // Create PAC resolver function from the PAC file content
  const FindProxyForURL = createPacResolver(QuickJS, pacContent);

  // Call the PAC resolver with the target URL
  const proxyString = await FindProxyForURL(targetUrl);

  logger.log(`PAC resolver returned: ${proxyString} for URL ${targetUrl}`);

  // Parse the result - it can be:
  // - "DIRECT" - no proxy
  // - "PROXY host:port" - use this proxy
  // - "PROXY host:port; DIRECT" - try proxy, fallback to direct
  // - "SOCKS host:port" - use SOCKS proxy
  if (!proxyString || proxyString.trim() === 'DIRECT') {
    return undefined;
  }

  // Extract the first proxy from the result
  const proxyMatch = proxyString.match(/PROXY\s+([a-zA-Z0-9._-]+:\d+)/i);
  if (proxyMatch?.[1]) {
    return `http://${proxyMatch[1]}`;
  }

  // Check for SOCKS proxy
  const socksMatch = proxyString.match(/SOCKS5?\s+([a-zA-Z0-9._-]+:\d+)/i);
  if (socksMatch?.[1]) {
    return `socks://${socksMatch[1]}`;
  }

  logger.log(`Could not parse proxy from PAC result: ${proxyString}`);
  return undefined;
}

export function invalidatePacCache(): void {
  cachedProxy = null;
}
