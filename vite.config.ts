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
      // folders
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@features': path.resolve(__dirname, './src/features'),
      '@services': path.resolve(__dirname, './src/services'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@themes': path.resolve(__dirname, './src/themes'),
      // files
      '@constants': path.resolve(__dirname, './src/constants.ts'),
    },
  },
});
