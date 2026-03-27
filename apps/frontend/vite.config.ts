import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /** * BAGIAN MODIFIKASI:
   * Kita gabungkan process.env (Environment dari Vercel) 
   * dengan loadEnv (Environment dari file .env lokal).
   * Ini supaya Vercel bisa mendeteksi variabel yang kamu input di Dashboard.
   */
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  /**
   * TETAP SESUAI INSTRUKSI ASDOS:
   * Melakukan pengecekan apakah VITE_CHECK ada.
   * Jika tidak ada, build akan sengaja dihentikan (Error).
   */
  const check = env.VITE_CHECK;
  if (!check) throw new Error("env is not detected");
  
  console.log("Berhasil mendeteksi env:", check);

  return {
    build: {
      sourcemap: true
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL || "http://localhost:3000",
          changeOrigin: true
        },
      }
    }
  }
})