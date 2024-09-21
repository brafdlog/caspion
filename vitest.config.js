import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import baseConfig from 'vitest.base.config.js';

export default defineConfig({
  ...baseConfig,
  plugins: [svelte(), svelteTesting(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest-setup.js',
    /**
     * By default, vitest searches for the test files in all packages.
     * For e2e tests, have vitest search only in the project root 'tests' folder.
     */
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    /**
     * The default timeout of 5000ms is sometimes not enough for playwright.
     */
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
