import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
        input: {
            arodav: resolve(__dirname, "arodav/index.html"),
            marces: resolve(__dirname, "marces/index.html"),
            // opcional: home
            index: resolve(__dirname, "index.html"),
        },
        },
    },
});