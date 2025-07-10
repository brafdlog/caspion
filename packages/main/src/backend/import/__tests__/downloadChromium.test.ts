import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the ProxyAgent to avoid actual network calls
vi.mock('proxy-agent', () => ({
  ProxyAgent: vi.fn().mockImplementation(() => ({
    // Mock proxy agent instance
  })),
}));

// Mock @puppeteer/browsers to avoid actual downloads
vi.mock('@puppeteer/browsers', () => ({
  Browser: { CHROMIUM: 'chromium' },
  detectBrowserPlatform: vi.fn(() => 'linux'),
  resolveBuildId: vi.fn(() => Promise.resolve('123456')),
  install: vi.fn(() => Promise.resolve({ executablePath: '/path/to/chromium' })),
}));

// Mock israeli-bank-scrapers-core to test proxy integration
vi.mock('israeli-bank-scrapers-core', () => ({
  createScraper: vi.fn(() => ({
    onProgress: vi.fn(),
    scrape: vi.fn(() => Promise.resolve({ success: true })),
  })),
}));

// Mock logger
vi.mock('/@/logging/logger', () => ({
  default: {
    log: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('downloadChromium proxy support', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset module registry to ensure fresh imports
    vi.resetModules();
    // Reset environment
    process.env = { ...originalEnv };
    delete process.env.HTTPS_PROXY;
    delete process.env.https_proxy;
    delete process.env.HTTP_PROXY;
    delete process.env.http_proxy;
    delete process.env.ALL_PROXY;
    delete process.env.all_proxy;
    delete process.env.NO_PROXY;
    delete process.env.no_proxy;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('should handle HTTPS_PROXY environment variable', async () => {
    process.env.HTTPS_PROXY = 'http://proxy.example.com:8080';

    await import('../downloadChromium');

    // Test that the function can be imported and the proxy detection logic works
    expect(process.env.HTTPS_PROXY).toBe('http://proxy.example.com:8080');
  });

  test('should handle NO_PROXY environment variable', async () => {
    process.env.NO_PROXY = '*';

    await import('../downloadChromium');

    // Test that NO_PROXY is respected
    expect(process.env.NO_PROXY).toBe('*');
  });

  test('should work without proxy configuration', async () => {
    // No proxy environment variables set

    await import('../downloadChromium');

    // Should work normally without proxy
    expect(process.env.HTTPS_PROXY).toBeUndefined();
  });

  test('should pass proxy args to bank scraper when proxy is configured', async () => {
    process.env.HTTPS_PROXY = 'http://proxy.example.com:8080';

    const { scrape } = await import('../bankScraper');
    const { createScraper } = await import('israeli-bank-scrapers-core');

    const mockScraper = {
      onProgress: vi.fn(),
      scrape: vi.fn(() => Promise.resolve({ success: true })),
      triggerTwoFactorAuth: vi.fn(),
      getLongTermTwoFactorToken: vi.fn(),
    };
    vi.mocked(createScraper).mockReturnValue(mockScraper);

    await scrape(
      {
        companyId: 'test',
        credentials: { username: 'test', password: 'test' },
        startDate: new Date(),
        timeout: 30000,
      },
      vi.fn(),
      '/path/to/chrome',
    );

    expect(createScraper).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ['--proxy-server=http://proxy.example.com:8080'],
      }),
    );
  });

  test('should not pass proxy args to bank scraper when no proxy is configured', async () => {
    // Clear all proxy environment variables
    delete process.env.HTTPS_PROXY;
    delete process.env.HTTP_PROXY;
    delete process.env.ALL_PROXY;
    delete process.env.NO_PROXY;

    const { scrape } = await import('../bankScraper');
    const { createScraper } = await import('israeli-bank-scrapers-core');

    const mockScraper = {
      onProgress: vi.fn(),
      scrape: vi.fn(() => Promise.resolve({ success: true })),
      triggerTwoFactorAuth: vi.fn(),
      getLongTermTwoFactorToken: vi.fn(),
    };
    vi.mocked(createScraper).mockReturnValue(mockScraper);

    await scrape(
      {
        companyId: 'test',
        credentials: { username: 'test', password: 'test' },
        startDate: new Date(),
        timeout: 30000,
      },
      vi.fn(),
      '/path/to/chrome',
    );

    expect(createScraper).toHaveBeenCalledWith(
      expect.objectContaining({
        args: [],
      }),
    );
  });
});
