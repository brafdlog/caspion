export default {
  number: 2,
  migration(state) {
    state.Importers.importers = state.Importers.importers.map((importer) => {
      if (importer.key === 'leumiCard') {
        importer.key = 'max';
        importer.name = 'Max';
      }
      return importer;
    });

    return state;
  },
};
