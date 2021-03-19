const NodeEnvironment = require('jest-environment-node');

class ScreenshotEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    this.global.lastTest = {};
  }

  handleTestEvent(event) {
    switch (event.name) {
      case 'test_fn_success':
        this.global.lastTest = {
          failed: false,
          test: event.test,
        };
        break;
      case 'test_fn_failure':
        this.global.lastTest = {
          failed: true,
          test: event.test,
        };
        break;
      default:
        break;
    }
  }
}

module.exports = ScreenshotEnvironment;
