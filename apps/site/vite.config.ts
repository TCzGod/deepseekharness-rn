import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** 品牌形象页入口：一个自包含的静态 SPA，可部署到任意静态托管。 */
export default defineConfig({
  plugins: [react()],
})