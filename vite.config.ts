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
  // абсолютные импорты в SCSS-файлах
  resolve: { alias: { styles: '/src/styles' } },
  build: {
    rollupOptions: {
      input: './src/WidgetCatalog.tsx',
      output: {
        format: 'umd',
        name: 'WidgetCatalog',
        entryFileNames: 'widget-catalog.js',
        assetFileNames: (assetInfo) => {
          const hasCss = assetInfo.names.some(name => name.slice(-4) === '.css') ||
            assetInfo.originalFileNames.some(name => name.slice(-4) === '.css');

          if (hasCss) {
            return 'widget-catalog.css';
          }

          return '[name].[hash][extname]'
        },
      }
    }
  }
})
