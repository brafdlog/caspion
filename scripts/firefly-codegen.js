/* eslint-disable import/no-extraneous-dependencies */
const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const swaggerRemoteUrl =
  'https://api-docs.firefly-iii.org/firefly-iii-2.1.0-v1.yaml';
const fireflyAPIFolder = path.join(
  __dirname,
  '..',
  'src/backend/export/outputVendors/firefly/api',
);

if (!fs.existsSync(fireflyAPIFolder)) {
  fs.mkdirSync(fireflyAPIFolder, { recursive: true });
}

const downloadSwaaggerFile = async (url, output) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(output, buffer);

  return output;
};

const generateAPIFromSwagger = async (input) => {
  generateApi({
    name: 'firefly-api.ts',
    input,
    output: fireflyAPIFolder,
  });
};

downloadSwaaggerFile(
  swaggerRemoteUrl,
  path.join(fireflyAPIFolder, 'firefly.openapi.yaml'),
).then(generateAPIFromSwagger);
