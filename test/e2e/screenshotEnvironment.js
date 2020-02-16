const JSDOMEnvironment = require('jest-environment-jsdom')

class ScreenshotEnvironment extends JSDOMEnvironment {
  constructor(config, context) {
    super(config, context)

    this.global.hasTestFailures = false;
  }

  handleTestEvent(event) {
    this.global.lastTest = {
      failed: event.name === 'test_fn_failure',
      test: event.test,
    };
  }
}

module.exports = ScreenshotEnvironment;
