import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     createSvgIconsPlugin({
//       // Specify the icon folder to be cached
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       // Specify symbolId format
//       symbolId: 'icon-[dir]-[name]',
//     }),
//     viteMockServe({
//       // default
//       mockPath: 'mock',
//       enable: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: `@import "@/styles/_variables.scss";`
//       }
//     }
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: import.meta.env,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     }
//   }
// })
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // 获取各个环境下对应的变量//
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/_variables.scss";`
        }
      }
    },
    // 代理跨域//
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置//
          target: env.VITE_SERVER,
          // 是否需要代理//
          changeOrigin: true,
          // 路径重写//
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  }
})
