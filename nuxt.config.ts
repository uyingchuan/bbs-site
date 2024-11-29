export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  ssr: false,
  modules: ['@element-plus/nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/eslint'],
  imports: {
    dirs: ['stores'],
  },
  css: ['~/assets/scss/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  plugins: [
    {
      src: '~/plugins/lifecycle',
      mode: 'all',
    },
  ],
});
