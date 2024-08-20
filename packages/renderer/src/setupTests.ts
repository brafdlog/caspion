/* eslint-disable @typescript-eslint/no-empty-function */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const MOCK_ELECTRON = {
  ipcRenderer: {
    invoke: () => {},
    send: () => {},
  },
};

// @ts-expect-error - this is a mock
window.require = (name: string) => {
  if (name === 'electron') {
    return MOCK_ELECTRON;
  }
  throw new Error(`No mock for module ${name}`);

};
