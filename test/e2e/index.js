
'use strict' // eslint-disable-line

// Set BABEL_ENV to use proper env config
process.env.BABEL_ENV = 'test';

// Enable use of ES6+ on required files
require('@babel/register')({
  ignore: [/node_modules/],
});

// Require all JS files in `./specs` for Mocha to consume
require('require-dir')('./specs');
