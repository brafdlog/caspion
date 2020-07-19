// This file is used as the initial config until the user saves the config for the first time to the file system
import outputVendors from '../outputVendors';
import { getDefaultValues } from './configUtils';

const vendorsDefaults = Object.keys(outputVendors).reduce((defaults, vendorKey) => {
  defaults[vendorKey] = {
    ...getDefaultValues(outputVendors[vendorKey]),
    active: false,
  };
  return defaults;
}, {});

export default {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: [
    ]
  },
  outputVendors: vendorsDefaults,
  monitoring: {
    email: {
      toEmailAddress: 'joe@someemail.com',
      sendgridApiKey: process.env.SENDGRID_API_KEY,
      sendReport: false
    }
  }
};
