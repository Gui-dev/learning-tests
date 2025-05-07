import { defineConfig, type UserConfig } from 'vite'
import type { ViteUserConfig as VitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const config: UserConfig & VitestConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest/setup-tests.ts',
  }
}

// https://vite.dev/config/
export default defineConfig(config)
