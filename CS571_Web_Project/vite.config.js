import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CS571_Web_Project/',
  build: {
    outDir: 'docs'
  }
});
