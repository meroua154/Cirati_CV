import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
=======
export default defineConfig({
  plugins: [react()],
>>>>>>> origin/main
  commonjsOptions: {
    esmExternals: true,
  },
});
