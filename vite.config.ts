import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/vtc-bonus-pwa/',  // ← important pour GitHub Pages
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: { sourcemap: true }
});