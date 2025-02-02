import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/api/, '/api')
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './src/setupTests.js'
    ],
  },
})

