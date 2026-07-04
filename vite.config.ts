import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// در حالت build خروجی زیر مسیر پروژه در GitHub Pages سرو می‌شود؛ در حالت dev از ریشه.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/golrang-platform-demo/' : '/',
  server: { port: 5173, open: true },
}))
