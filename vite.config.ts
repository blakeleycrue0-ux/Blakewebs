import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Broad compatibility target: avoids shipping syntax that older/locked-down
    // mobile Safari can fail to parse (a JS parse error blanks the whole page
    // since nothing else can run).
    target: ['es2018', 'safari13'],
  },
})
