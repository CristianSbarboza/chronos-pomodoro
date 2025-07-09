import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // Permite acesso externo
    port: 5173,        // (opcional) porta padrão do Vite
  }
})
