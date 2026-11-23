import { configFilePath } from '@/app-globals';
import { getConfig, updateConfig } from '@/backend/configManager/configManager';
import { KeyringUnavailableError } from '@/backend/configManager/encryption/keytar';
import { dialog } from 'electron';

let keyringErrorShown = false;

export async function getConfigHandler(): Promise<string> {
  const config = await getConfig();
  return JSON.stringify({ config });
}

export async function updateConfigHandler(_: unknown, configStr: string) {
  const config = JSON.parse(configStr);
  try {
    await updateConfig(configFilePath, config);
  } catch (e) {
    // Saving fails on every config change while the keyring is missing; tell the user once
    // instead of failing silently.
    if (e instanceof KeyringUnavailableError && !keyringErrorShown) {
      keyringErrorShown = true;
      dialog.showMessageBox({ type: 'error', title: 'Settings not saved', message: e.message });
    }
    throw e;
  }
}
