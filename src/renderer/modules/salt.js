import { loadSALT, saveSALT } from './keyar';

export default async function SALT(newIfNotExist) {
  const SALT = await loadSALT();
  if (SALT) return SALT;

  if (!newIfNotExist) throw Error('SALT not exist');

  await saveSALT(newIfNotExist);
  return loadSALT();
}
