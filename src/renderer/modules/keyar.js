import keytar from 'keytar';

const serviceName = 'israeli-bank-scrapers-desktop';
const accountName = 'crypto';

export async function loadSALT() {
  return keytar.getPassword(serviceName, accountName);
}

export async function saveSALT(newSALT) {
  return keytar.setPassword(serviceName, accountName, newSALT);
}
