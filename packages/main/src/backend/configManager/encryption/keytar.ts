import keytar from 'keytar';

const serviceName = import.meta.env.VITE_APP_NAME;
const accountName = 'crypto';

export class KeyringUnavailableError extends Error {
  constructor(cause: unknown) {
    const reason = cause instanceof Error ? cause.message : String(cause);
    const hint =
      process.platform === 'linux'
        ? ' Make sure a Secret Service keyring (e.g. gnome-keyring) is running and has an unlocked default ' +
          '"login" keyring. You can create one with Seahorse ("Passwords and Keys") or by running ' +
          '`gnome-keyring-daemon --replace --unlock` and entering a password.'
        : '';
    super(`Caspion could not access the system keyring, so settings cannot be saved: ${reason}.${hint}`);
    this.name = 'KeyringUnavailableError';
  }
}

async function withKeyring<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (e) {
    throw new KeyringUnavailableError(e);
  }
}

export async function loadSALT() {
  return withKeyring(() => keytar.getPassword(serviceName, accountName));
}

export async function saveSALT(newSALT: string) {
  return withKeyring(() => keytar.setPassword(serviceName, accountName, newSALT));
}

export async function saveIntoAccount(account: string, password: string) {
  return withKeyring(() => keytar.setPassword(serviceName, account, password));
}

export async function getFromAccount(account: string) {
  return withKeyring(() => keytar.getPassword(serviceName, account));
}
