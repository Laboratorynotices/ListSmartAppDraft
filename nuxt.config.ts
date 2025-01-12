// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxthub/core", "nuxt-vuefire"],
  // Пока отключаем, чтобы не было ошибок при деплое
  ssr: false,
  vuefire: {
    // Будем пользовать авторизацией
    auth: {
      enabled: true,
      // Пока не будем использовать SSR
      sessionCookie: false,
    },
    // Подключение для CSR авторизации
    config: {
      apiKey: process.env.GOOGLE_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.GOOGLE_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.GOOGLE_FIREBASE_CONFIG_PROJECT_ID,
      storageBucket: process.env.GOOGLE_FIREBASE_CONFIG_STORAGE_BUCKET,
      messagingSenderId: process.env.GOOGLE_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
      appId: process.env.GOOGLE_FIREBASE_CONFIG_APP_ID,
    },
  },
});
