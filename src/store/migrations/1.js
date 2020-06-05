import { randomHex } from '@/modules/encryption/crypto';

export default {
  number: 1,
  migration(state) {
    state.Importers.importers = state.Importers.importers.map((importer) => {
      importer.id = importer.id || randomHex();
      return importer;
    });
    return state;
  },
};
