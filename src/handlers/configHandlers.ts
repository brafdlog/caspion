import { configFilePath } from '@/app-globals';
import { getConfig } from '@/backend/configManager/configManager';

export async function getConfigHandler(): Promise<string> {
  const config = await getConfig(configFilePath);
  return JSON.stringify({ config });
}
