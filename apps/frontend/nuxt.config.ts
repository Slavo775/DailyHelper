// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@daily-helper/ui', 'nuxtjs-naive-ui', '@pinia/nuxt'],
  plugins: ['@daily-helper/ui/lib/plugins/icon.ts', '~/plugins/gemini.ts'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@daily-helper/ui/styles/respondTo.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    private: {
      geminiApiKey: process.env.GEMINI_API_KEY,
    },
  },
})