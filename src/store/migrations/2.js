import { SCRAPERS } from 'israeli-bank-scrapers-core';

export default {
  number: 2,
  migration(state) {
    state.Importers.importers = state.Importers.importers.map((importer) => {
      if (importer.key === 'leumiCard') {
        importer.key = 'max';
        importer.name = SCRAPERS.max.name;
      }
      return importer;
    });

    return state;
  },
};
