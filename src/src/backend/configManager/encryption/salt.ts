import { loadSALT, saveSALT } from './keytar';

export default async function SALT(defaultValue?: string): Promise<string> {
  const existedSALT = await loadSALT();
  if (existedSALT) return existedSALT;

  if (!defaultValue) throw Error('SALT not exist');

  await saveSALT(defaultValue);
  return defaultValue;
}
