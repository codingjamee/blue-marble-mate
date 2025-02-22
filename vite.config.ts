/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import type { UserConfig as ViteConfig } from 'vite';
import type { InlineConfig as VitestConfig } from 'vitest/node';

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
  },
} as ViteConfig & VitestConfig);
