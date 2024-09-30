import {
    defineConfig
} from 'vite';

export default defineConfig({
    server: {
        port: 3002
    },
    build: {
        target: "es2022",
        rollupOptions: {
            input: {
                main: './index.html',
                blog: './pages/blogs.html',
                create: './pages/create.html',
                login: './pages/login.html',
                register: './pages/register.html',
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