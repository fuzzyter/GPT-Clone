import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../test').replace(/\\/g, '/');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Use relative paths for Electron
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-redux': path.resolve(__dirname, 'node_modules/react-redux'),
      '@reduxjs/toolkit': path.resolve(__dirname, 'node_modules/@reduxjs/toolkit'),
      '@testing-library/react': path.resolve(
        __dirname,
        'node_modules/@testing-library/react'
      ),
      '@testing-library/user-event': path.resolve(
        __dirname,
        'node_modules/@testing-library/user-event'
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: `${testRoot}/setup.js`,
    include: [`${testRoot}/**/*.test.{js,jsx}`],
    css: true,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
});
