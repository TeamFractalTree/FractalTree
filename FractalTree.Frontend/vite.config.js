import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: "autoUpdate",
        workbox: {
            maximumFileSizeToCacheInBytes: 115343360,
            navigateFallback: "/index.html",
            runtimeCaching: []
        },
        client: {
            installPrompt: true,
        },
        manifest: {
            "theme_color": "#ffffff",
            "background_color": "#ffffff",
            "icons": [
                {
                    "purpose": "maskable",
                    "sizes": "512x512",
                    "src": "/Images/icon512_rounded.png",
                    "type": "image/png"
                },
                {
                    "purpose": "any",
                    "sizes": "512x512",
                    "src": "/Images/icon512_rounded.png",
                    "type": "image/png"
                }
            ],
            "orientation": "portrait",
            "display": "standalone",
            "dir": "auto",
            "lang": "en-US",
            "name": "Fractal Tree",
            "short_name": "Fractal Tree",
            "scope": "https://app.fractal-tree.org/",
            "start_url": "https://app.fractal-tree.org/index.html",
            "description": "Bridging the digital divide, dive into the world of coding with just a pen, paper, and a smartphone!",
            "id": "org.fractal-tree.app"
        }
    })],
    build: {
        outDir: "../FractalTree.MobileApp/www"
    },
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:32769",
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    }
});
