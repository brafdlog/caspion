import { app } from 'electron';
import { configFilePath } from '@/app-globals';
import { getConfig, updateConfig } from '@/backend/configManager/configManager';

export async function getConfigHandler(): Promise<string> {
  const config = await getConfig(configFilePath(app));
  return JSON.stringify({ config });
}

export async function updateConfigHandler(event, configStr: string) {
  const config = JSON.parse(configStr);
  await updateConfig(configFilePath(app), config);
}
