import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import analyze from "rollup-plugin-analyzer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ckeditor5-custom-build']
},
build: {
    commonjsOptions: {
        exclude: ['ckeditor5-custom-build']
    },
},
})
