import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import { obfuscatePlugin } from './build/vite-plugin-obfuscate.js'

// 是否生产环境
const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    // Brotli 压缩（压缩率更高，GitHub Pages 支持）
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // 生产环境：对敏感文件进行混淆
    isProduction && obfuscatePlugin({
      include: [
        'src/utils/codec.js',
        'src/utils/constants.js',
        'src/utils/format.js',
        'src/utils/anti-debug.js',
        'src/composables/useWallpapers.js',
      ],
    }),
  ].filter(Boolean),
  
  base: '/wallpaper-gallery/',  // ⚠️ 关键修改：改成你的仓库名
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`,
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      external: isProduction ? ['vue', 'vue-router', 'gsap'] : [],
      output: {
        globals: {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'gsap': 'gsap',
        },
        manualChunks: {
          'element-plus': ['element-plus'],
          'vant': ['vant'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
