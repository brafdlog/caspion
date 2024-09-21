import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // You can set this to true if you want to simulate a matching media query
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated method
    removeListener: vi.fn(), // Deprecated method
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('electron', () => {
  const invokeSpy = vi.fn((channel) => {
    if (channel === 'getAppInfo') {
      return Promise.resolve({ name: 'Test App', version: '1.0.0' });
    }
    if (channel === 'getConfig') {
      return Promise.resolve(
        JSON.stringify({ config: { someKey: 'someValue' } }),
      );
    }
    if (channel === 'getLogsInfo') {
      return Promise.resolve({
        logsFolder: '/path/to/logs',
        otherData: 'someValue',
      });
    }
    return Promise.resolve(null);
  });
  return {
    default: {
      ipcRenderer: {
        invoke: invokeSpy,
      },
    },
  };
});

global.window.require = vi.fn().mockImplementation((module) => {
  if (module === 'electron') {
    return {
      ipcRenderer: {
        invoke: vi.fn(),
        send: vi.fn(),
      },
      shell: {
        openExternal: vi.fn(),
      },
    };
  }
});

import '@testing-library/jest-dom/vitest';
