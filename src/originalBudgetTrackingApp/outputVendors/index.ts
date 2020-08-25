import { ynabOutputVendor } from './ynab/ynab';
import { googleSheetsOutputVendor } from './googleSheets/googleSheets';

const outputVendors = [ynabOutputVendor, googleSheetsOutputVendor];

export default outputVendors;
