import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    cors: true,
    hmr: {
      host: 'echoji.co',
      protocol: 'wss',
      clientPort: 443
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8888,
    strictPort: true,
    cors: true,
    allowedHosts: [
      'echoji.co',
      'www.echoji.co',
      '91.98.143.182'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
})
