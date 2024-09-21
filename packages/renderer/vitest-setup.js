import { vi } from 'vitest';

vi.mock('electron', () => ({
  default: {
    ipcRenderer: {
      invoke: vi.fn(),
      send: vi.fn(),
    },
    shell: {
      openExternal: vi.fn(),
    },
  },
}));

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
