/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, '../ui')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PromptOptimizerUI',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    watch: process.env.NODE_ENV === 'development' ? {
      // 更精确的监听配置
      include: ['src/**/*'],
      buildDelay: 100
    } : null,
    sourcemap: true,
    rollupOptions: {
      external: ['vue', '@prompt-optimizer/core', 'element-plus', 'element-plus/dist/index.css', 'uuid'],
      output: {
        globals: {
          vue: 'Vue',
          '@prompt-optimizer/core': 'PromptOptimizerCore',
          'element-plus': 'ElementPlus',
          'uuid': 'uuid'
        },
        assetFileNames: 'style.css'
      }
    },
    cssCodeSplit: false,
    emptyOutDir: false
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  test: {
    // 全局超时设置为5秒
    testTimeout: 5000,
    // 环境设置
    environment: 'jsdom',
    // 包含的文件模式
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 排除的文件模式
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    // 全局测试设置
    globals: true,
    // 测试覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
      ],
    },
  },
}) 