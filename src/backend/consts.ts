import electron from 'electron';

const App = electron.app || electron.remote.app;

export const userDataPath = App.getPath('userData');
