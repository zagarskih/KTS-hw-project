import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassEmbedded from 'sass-embedded';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sassEmbedded,
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
      api: path.resolve(__dirname, './src/api'),
      hooks: path.resolve(__dirname, './src/hooks'),
      helpers: path.resolve(__dirname, './src/helpers'),
      styles: path.resolve(__dirname, './src/styles'),
      pages: path.resolve(__dirname, './src/pages'),
      stores: path.resolve(__dirname, './src/stores'),
    },
  },
});
