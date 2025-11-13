import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // biar bisa diakses dari jaringan luar (termasuk ngrok)
    allowedHosts: ['semiarchitecturally-dreamlike-jaida.ngrok-free.dev']
  }
})
