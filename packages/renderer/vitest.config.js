import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import baseConfig from '../../vitest.base.config.js';
import path from 'path';

export default defineConfig({
  ...baseConfig,
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.jsx', '.css'],
  },
  test: {
    ...baseConfig.test,
    setupFiles: path.resolve(__dirname, './vitest-setup.js'),
  },
});
