import { googleSheetsOutputVendor } from './googleSheets/googleSheets';
import json from './json/json';
import { ynabOutputVendor } from './ynab/ynab';

const outputVendors = [ynabOutputVendor, googleSheetsOutputVendor, json];

export default outputVendors;
