import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      'echoji.co',
      'www.echoji.co',
      '.echoji.co'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: 8888,
    allowedHosts: [
      'echoji.co',
      'www.echoji.co',
      '.echoji.co'
    ]
  }
})
