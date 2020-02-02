/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const replace = require('replace-in-file');

function replaceValueByEnvVar(key) {
  if (process.env[key]) {
    console.log(`Replacing ${key}`);
    const options = {
      files: '**/client_secret.json',
      from: new RegExp(key, 'g'),
      to: process.env[key],
    };

    try {
      const results = replace.sync(options);
      console.log('Replacement results:', results);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  } else {
    console.log(`No key ${key} inject`);
  }
}

const envsToReplace = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
];

envsToReplace.forEach((env) => replaceValueByEnvVar(env));
