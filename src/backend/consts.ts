import { app, remote } from 'electron';

const App = app || remote.app;

export const userDataPath = App.getPath('userData');
