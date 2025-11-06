import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';


// Petit plugin pour copier le service worker dans dist/
function copySW() {
return {
name: 'copy-sw',
closeBundle() {
const src = resolve(__dirname, 'src/pwa/sw.js');
const outDir = resolve(__dirname, 'dist');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
cpSync(src, resolve(outDir, 'sw.js'));
}
};
}


export default defineConfig({
plugins: [react(), copySW()],
server: { host: true, port: 5173 },
build: { sourcemap: true }
});