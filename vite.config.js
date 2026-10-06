import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        products: 'http://localhost:5001/assets/remoteEntry.js',
        orders: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  server: { port: 5000 },
  build: { target: 'esnext', minify: false },
});
