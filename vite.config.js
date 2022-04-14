import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
// import { chromeExtension } from 'vite-plugin-chrome-extension'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        copy({
            targets: [
                { 
                    src: 'src/chrome/content.js',
                    dest: 'dist/' 
                },
                { 
                    src: 'src/chrome/background.js',
                    dest: 'dist/' 
                },
                { 
                    src: 'src/chrome/dialog.css',
                    dest: 'dist/' 
                }
            ],
            hook: 'writeBundle' // notice here
        })
    ]
})
