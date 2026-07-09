import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the ShopEase frontend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Dev proxy: forwards /api/* to the correct microservice so
    // relative URLs work in both local dev and Docker (nginx).
    proxy: {
      '/api/users': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/products': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/orders': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/payments': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
})
