import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: { alias: { styles: '/src/styles' } },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: './src/WidgetCatalog.tsx',
      },
      output: {
        format: 'umd',
        name: 'WidgetCatalog',
        assetFileNames: 'widget-catalog.css',
        entryFileNames: 'widget-catalog.js',
      }
    }
  }
});