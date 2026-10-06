import { defineConfig } from 'vite';
// PORT lets a launcher assign a free port (dev and preview); defaults stay 5173 / 4173.
const port = Number(process.env.PORT) || undefined;
export default defineConfig({ esbuild: { jsx: 'automatic' }, server: { port }, preview: { port } });
