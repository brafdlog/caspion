/**
 * @module preload
 */

import { stopPeriodicScraping } from './eventsBridge';

export * from './eventsBridge';

// Clear the interval that scrapes periodically
await stopPeriodicScraping();

