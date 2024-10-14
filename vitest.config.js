import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import baseConfig from './vitest.base.config.js';

export default defineConfig({
  plugins: [svelte(), svelteTesting(), tsconfigPaths()],
  test: {
    ...baseConfig.test,
    setupFiles: './vitest-setup.js',
    /**
     * By default, vitest searches for the test files in all packages.
     * For e2e tests, have vitest search only in the project root 'tests' folder.
     */
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
