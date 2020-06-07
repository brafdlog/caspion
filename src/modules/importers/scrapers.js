import { SCRAPERS } from 'israeli-bank-scrapers-core';

export default Object.keys(SCRAPERS)
  .map((key) => ({
    key,
    ...SCRAPERS[key],
  }));
