/* eslint-disable no-console */
if (process.env.GOOGLE_SERVICE_PRIVATE_KEY) {
  console.log('Replacing private key');
  // eslint-disable-next-line import/no-extraneous-dependencies
  const replace = require('replace-in-file');
  const options = {
    files: '**/googleServiceAccount.js',
    from: /GOOGLE_SERVICE_PRIVATE_KEY/g,
    to: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  };

  try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
} else {
  console.log('No private key to inject');
}
