const fs = require('fs');
const path = require('path');

const CATEGORY_CALCULATION_SCRIPT_DIR_PATH = path.join(__dirname, '..', 'src/backend/import');
const CATEGORY_CALCULATION_SCRIPT_EXAMPLE_FILE_NAME = 'categoryCalculationScript-example.ts';
const CATEGORY_CALCULATION_SCRIPT_FILE_NAME = CATEGORY_CALCULATION_SCRIPT_EXAMPLE_FILE_NAME.replace('-example', '');

const CATEGORY_CALCULATION_SCRIPT_EXAMPLE_FILE_PATH = path.join(CATEGORY_CALCULATION_SCRIPT_DIR_PATH, CATEGORY_CALCULATION_SCRIPT_EXAMPLE_FILE_NAME);
const CATEGORY_CALCULATION_SCRIPT_FILE_PATH = path.join(CATEGORY_CALCULATION_SCRIPT_DIR_PATH, CATEGORY_CALCULATION_SCRIPT_FILE_NAME);

if (!fs.existsSync(CATEGORY_CALCULATION_SCRIPT_FILE_PATH)) {
  // eslint-disable-next-line no-console
  console.log('Creating the category calculation script from the example script');
  fs.copyFileSync(CATEGORY_CALCULATION_SCRIPT_EXAMPLE_FILE_PATH, CATEGORY_CALCULATION_SCRIPT_FILE_PATH);
}
