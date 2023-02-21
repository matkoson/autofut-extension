import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'vite'

export default defineConfig({
  mode: 'development',
  define: {
    global: {},
  },
  build:{
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'dist/commonjs/index.js'),
      name: 'AutoFut',
      // the proper extensions will be added
      fileName: 'bundle.js',
    },
    outDir: resolve(__dirname, 'dist/vite'),
    rollupOptions: {
      plugins:[
        commonjs()
      ]
    },
  }
})
