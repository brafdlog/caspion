module.exports = {
  scraping: {
    start: 'scraping:start',
    done: 'scraping:done',
    error: 'scraping:error'
  },
  config: {
    getCurrentConfig: 'config:getCurrent',
    updateConfig: 'config:update',
    updatedConfig: 'config:updated',
    gotCurrentConfig: 'config:gotCurrent'
  },
  ynab: {
    getYnabAccountData: 'ynab:getAccountData',
    gotYnabAccountData: 'ynab:gotAccountData'
  }
};
