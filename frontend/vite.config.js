// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from "path"
 

// // https://vite.dev/config/
// export default defineConfig({
//   server:{
//    proxy: {
//     //  '/api/auth': 'http://${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
//     //  '/api/crud': 'http://${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
//      '/api': {
//       target: 'http://${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
//       changeOrigin: true,
//       secure: false,
//     },
//    },
//   },
//     plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
    
//   },
  
  
// })
  

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
 server: {
    proxy: {
      '/api': {
        target: 'http://${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // Explicitly keep /api
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  } ,
})