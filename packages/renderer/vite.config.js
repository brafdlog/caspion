/* eslint-env node */

import react from '@vitejs/plugin-react';
import { join } from 'node:path';
import { renderer } from 'unplugin-auto-expose';
import { chrome } from '../../.electron-vendors.cache.json';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      events: 'events',
    },
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    nodePolyfills({
      include: ['util', 'path','fs', 'stream'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      overrides: {
        fs: 'memfs',
      },
      protocolImports: true,
    }),
    react(),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
  ],
};

export default config;
