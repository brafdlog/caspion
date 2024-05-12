import csv from './csv/csv';
import firefly from './firefly';
import { googleSheetsOutputVendor } from './googleSheets/googleSheets';
import json from './json/json';
import { ynabOutputVendor } from './ynab/ynab';

const outputVendors = [csv, json, ynabOutputVendor, googleSheetsOutputVendor, firefly];

export default outputVendors;
