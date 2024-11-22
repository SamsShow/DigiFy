import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Import the named export

export default defineConfig({
  plugins: [
    nodePolyfills({ // Use the named function here
      protocolImports: true, // Automatically polyfill `buffer`, `crypto`, etc.
    }),
  ],
  resolve: {
    alias: {
      // Ensure Vite uses the Buffer polyfill
      buffer: 'buffer',
    },
  },
});
