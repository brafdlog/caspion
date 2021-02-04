import { tmpdir } from 'os';

export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
};

let appPath = tmpdir()
export const app = {
  getPath: jest.fn().mockReturnValue(appPath),
  setPath: jest.fn((name, path) => appPath = path)
};
