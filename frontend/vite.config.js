// vite.config.js

import {
  defineConfig
} from 'vite';

import react
  from '@vitejs/plugin-react';

import tailwindcss
  from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    // React support
    react(),

    // Tailwind CSS support
    tailwindcss()
  ],

  // Vite development proxy.
  //
  // When React requests:
  //
  // /api/books
  //
  // Vite forwards it to:
  //
  // http://localhost:3000/api/books
  server: {
    proxy: {
      '/api': {
        target:
          'http://localhost:3000',

        changeOrigin: true
      }
    }
  }
});