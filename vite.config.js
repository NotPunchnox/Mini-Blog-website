import {
    defineConfig
} from 'vite';

export default defineConfig({
    build: {
        target: "es2022",
        rollupOptions: {
            input: {
                main: './index',
                blog: './pages/blogs',
                create: './pages/create',
                login: './pages/login',
                register: './pages/register',
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