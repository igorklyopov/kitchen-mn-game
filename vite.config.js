import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  publicDir: 'public',
  root: './',
  build: {
    outDir: 'docs',
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
});
