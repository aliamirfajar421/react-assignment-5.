import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 کا آفیشل پلگ ان
  ],
  base: './', // Relative paths تاکہ gh-pages پر 404 نہ آئے
})