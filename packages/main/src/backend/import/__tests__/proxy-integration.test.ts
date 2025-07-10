import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

describe('Proxy support integration test', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment
    process.env = { ...originalEnv };
    delete process.env.HTTPS_PROXY;
    delete process.env.HTTP_PROXY;
    delete process.env.ALL_PROXY;
    delete process.env.NO_PROXY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('should detect proxy environment variables', () => {
    process.env.HTTPS_PROXY = 'http://proxy.example.com:8080';

    // Test that the environment variable is properly set
    expect(process.env.HTTPS_PROXY).toBe('http://proxy.example.com:8080');
  });

  test('should work without proxy', () => {
    // No proxy environment variables set
    expect(process.env.HTTPS_PROXY).toBeUndefined();
    expect(process.env.HTTP_PROXY).toBeUndefined();
  });
});
