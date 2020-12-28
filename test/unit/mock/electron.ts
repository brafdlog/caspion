import { tmpdir } from 'os';

export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
};

export const app = {
  getPath: jest.fn().mockReturnValue(tmpdir())
};
