import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';

// Mock electron directly in the test file
vi.mock('electron', () => {
  // Define spies and mock implementations inside the mock factory
  const invokeSpy = vi.fn((channel) => {
    if (channel === 'getAppInfo') {
      return Promise.resolve({ name: 'Test App', version: '1.0.0' });
    }
    if (channel === 'getConfig') {
      return Promise.resolve(JSON.stringify({ config: { someKey: 'someValue' } }));
    }
    if (channel === 'getLogsInfo') {
      return Promise.resolve({ logsFolder: '/path/to/logs', otherData: 'someValue' });  // Ensure logsFolder is defined
    }
    return Promise.resolve(null);
  });

  return {
    default: {
      ipcRenderer: {
        invoke: invokeSpy,
        send: vi.fn(),
        on: vi.fn(),
      },
      shell: {
        openExternal: vi.fn(),
        openPath: vi.fn(),
      },
    },
  };
});

test('renders discord link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ערוץ הדיסקורד שלנו/i);
  expect(linkElement).to.exist;
});
