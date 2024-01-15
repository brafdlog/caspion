const electron = process.type === 'browser'
  ? require('electron')
  : require('@electron/remote');

export default electron;
