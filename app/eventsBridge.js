const { ipcMain } = require('electron');
const events = require('./constants/events');
const runScraper = require('./node/index');

ipcMain.on(events.scraping.start, async event => {
  debugger;
  try {
    const response = await runScraper();
    event.sender.send(events.scraping.done, response);
  } catch (e) {
    event.sender.send(events.scraping.error, e);
  }

});
