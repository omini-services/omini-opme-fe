import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      // src folders
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './api'),
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@components': path.resolve(__dirname, './src/components'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      // root folders
      '@public': path.resolve(__dirname, './public'),
      // files
      '@constants': path.resolve(__dirname, './src/constants.ts'),
    },
  },
});
