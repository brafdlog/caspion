const { testWithSpectron } = require('vue-cli-plugin-electron-builder');

export default {
  afterEach() {
    this.timeout(10000);

    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
    this.stop();
  },
  async beforeEach() {
    this.timeout(20000);
    const { app, stopServe } = await testWithSpectron();
    this.app = app;
    this.stop = stopServe;


    return this.app;
  },
};
