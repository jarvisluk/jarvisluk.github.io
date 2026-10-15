import { defineConfig } from 'vite';
import copyEditor from './scripts/copy-editor/plugin.mjs';
// PORT lets a launcher assign a free port (dev and preview); defaults stay 5173 / 4173.
const port = Number(process.env.PORT) || undefined;
// copyEditor: on-page copy review in `npm run dev` only (press Alt+C or the 文案 button).
export default defineConfig({ esbuild: { jsx: 'automatic' }, server: { port }, preview: { port }, plugins: [copyEditor()] });
