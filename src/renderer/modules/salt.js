import { loadSALT, saveSALT } from './keyar';

export default async function SALT(defaultValue) {
  const SALT = await loadSALT();
  if (SALT) return SALT;

  if (!defaultValue) throw Error('SALT not exist');

  await saveSALT(defaultValue);
  return loadSALT();
}
