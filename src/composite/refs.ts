import { computed } from '@vue/composition-api';
import path from 'path';

export const filenameToFile = (filename: string) => computed({
  get: () => new File([''], filename),
  set: (file: File) => {
    filename = file && path.join(file.path || file.name);
  }
});
