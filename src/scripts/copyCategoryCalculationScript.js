const fs = require('fs');
const path = require('path');

const SCRIPT_DIR_PATH = path.join(__dirname, '..', 'src/backend/import');
const SCRIPT_EXAMPLE_FILE_NAME = 'categoryCalculationScript-example.ts';
const SCRIPT_FILE_NAME = SCRIPT_EXAMPLE_FILE_NAME.replace('-example', '');

const SCRIPT_EXAMPLE_FILE_PATH = path.join(SCRIPT_DIR_PATH, SCRIPT_EXAMPLE_FILE_NAME);
const SCRIPT_FILE_PATH = path.join(SCRIPT_DIR_PATH, SCRIPT_FILE_NAME);

if (!fs.existsSync(SCRIPT_FILE_PATH)) {
  // eslint-disable-next-line no-console
  console.log('Creating the category calculation script from the example script');
  fs.copyFileSync(SCRIPT_EXAMPLE_FILE_PATH, SCRIPT_FILE_PATH);
}
