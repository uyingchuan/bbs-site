// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
      '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  css: [
  ],
  imports: {
    dirs: ['stores']
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  }
})
