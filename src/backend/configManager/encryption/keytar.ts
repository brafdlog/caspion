import keytar from 'keytar';

const serviceName = 'israeli-bank-scrapers-desktop';
const accountName = 'crypto';

export async function loadSALT() {
  return keytar.getPassword(serviceName, accountName);
}

export async function saveSALT(newSALT: string) {
  return keytar.setPassword(serviceName, accountName, newSALT);
}

export async function saveIntoAccount(account, password) {
  return keytar.setPassword(serviceName, account, password);
}

export async function getFromAccount(account) {
  return keytar.getPassword(serviceName, account);
}
