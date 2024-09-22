import {
    defineConfig
} from 'vite';

export default defineConfig({
    build: {
        target: "es2022",
        rollupOptions: {
            input: {
                main: './index.html',
                blog: './pages/blog.html',
                create: './pages/create.html',
            }
        }
    },
    esbuild: {
        target: "es2022"
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2022",
        }
    }
});