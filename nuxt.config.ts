// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Status Screen Manager',
      description: "Status Screen Manager",
      theme_color: "#ffffff",
      lang: "ja",
      short_name: "SSM",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [
        {
          src: "icons/48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "icons/72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "icons/96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "icons/144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "icons/192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "icons/512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: null
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: "module"
    },
  },
  app: {
    link: [
      { rel: "manifest", href: "/manifest.webmanifest" },
    ]
  },
  build: {
    transpile: ["vuetify"],
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(vuetify());
    },
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    preset: "firebase",
  },
  css: ["@/assets/main.scss"],
});
