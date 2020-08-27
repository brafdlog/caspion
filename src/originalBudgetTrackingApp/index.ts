import * as configManager from './configManager/configManager';

export { AccountToScrapeConfig, Config } from './configManager/configTypes';
export { default as defaultConfig } from './configManager/defaultConfig';
export { inputVendors } from './flow/scrape';
export { default as outputVendors } from './outputVendors';
export { configManager };
