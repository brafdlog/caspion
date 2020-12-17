import csv from './csv/csv';
import json from './json/json';
import { ynabOutputVendor } from './ynab/ynab';
import { googleSheetsOutputVendor } from './googleSheets/googleSheets';

const outputVendors = [csv, json, ynabOutputVendor, googleSheetsOutputVendor];

export default outputVendors;
