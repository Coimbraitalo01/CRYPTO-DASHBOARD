import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true  // Adicione esta linha para melhorar o hot-reload
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})