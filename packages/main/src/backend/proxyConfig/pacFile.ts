import http from 'http';
import https from 'https';
import logger from '/@/logging/logger';

const PAC_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PAC_FETCH_TIMEOUT_MS = 10000; // 10 seconds
const PROXY_PATTERN = /PROXY\s+([a-zA-Z0-9.-]+:\d+)/;

interface CachedPacFile {
  content: string;
  url: string;
  timestamp: number;
}

let cachedPacContent: CachedPacFile | null = null;

/**
 * Fetches PAC file content from URL with caching
 */
export async function fetchPacFile(pacUrl: string, bustCache = false): Promise<string> {
  // Return cached content if valid
  if (!bustCache && cachedPacContent?.url === pacUrl) {
    const age = Date.now() - cachedPacContent.timestamp;
    if (age < PAC_CACHE_TTL_MS) {
      logger.log(`Using cached PAC file (age: ${Math.round(age / 1000)}s)`);
      return cachedPacContent.content;
    }
  }

  return new Promise((resolve, reject) => {
    const urlObj = new URL(pacUrl);
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.get(pacUrl, { timeout: PAC_FETCH_TIMEOUT_MS }, (res) => {
      if (res.statusCode && res.statusCode !== 200) {
        reject(new Error(`PAC file fetch failed with status ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        cachedPacContent = {
          content: data,
          url: pacUrl,
          timestamp: Date.now(),
        };
        resolve(data);
      });
    });

    req.on('error', (err) => reject(new Error(`PAC file fetch failed: ${err.message}`)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`PAC file fetch timeout after ${PAC_FETCH_TIMEOUT_MS}ms`));
    });
  });
}

/**
 * Extracts proxy server from PAC file content
 * Looks for PROXY directives in the PAC file
 */
export function extractProxyFromPac(pacContent: string): string | undefined {
  // Look for return statements with PROXY directives
  // Common patterns: "PROXY proxy.example.com:8080" or "PROXY host:port; DIRECT"
  const proxyMatch = pacContent.match(PROXY_PATTERN);
  if (proxyMatch?.[1]) {
    return `http://${proxyMatch[1]}`;
  }
  return undefined;
}

/**
 * Invalidates cached PAC file content, forcing re-fetch on next call
 */
export function invalidatePacCache(): void {
  cachedPacContent = null;
}
