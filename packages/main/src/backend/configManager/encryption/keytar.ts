import keytar from 'keytar';

const serviceName = import.meta.env.VITE_APP_NAME;
const accountName = 'crypto';

export async function loadSALT() {
  return keytar.getPassword(serviceName, accountName);
}

export async function saveSALT(newSALT: string) {
  return keytar.setPassword(serviceName, accountName, newSALT);
}

export async function saveIntoAccount(account: string, password: string) {
  return keytar.setPassword(serviceName, account, password);
}

export async function getFromAccount(account: string) {
  return keytar.getPassword(serviceName, account);
}
