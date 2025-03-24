// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ["@pinia/nuxt"],
  css: ["@/assets/css/main.sass"],
  devtools: { enabled: true },
  runtimeConfig: {
   jwtSecret: process.env.JWT_SECRET || "super-secret-key"
 }
});
