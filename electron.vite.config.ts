import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@preload': resolve('src/preload'),
        '@renderer': resolve('src/renderer/src'),
        '@interface': resolve('src/shared/interface'),
        '@service': resolve('src/shared/service'),
      }
    },
    plugins: [react()],
    server: {
      fs: {
        deny: ['.env', '.env.*', '*.{crt,pem}', 'custom.secret']
      }
    }
  }
})
