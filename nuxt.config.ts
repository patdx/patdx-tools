// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    [
      'unplugin-icons/nuxt',
      {
        /* options */
      },
    ],
  ],
  pinia: {
    storesDirs: ['./src/stores/**'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    prerender: {
      routes: ['/manifest.json'],
    },
  },
  experimental: {
    // inlineSSRStyles: false,
  },
  vue: {
    compilerOptions: {
      whitespace: 'condense',
    },
  },
});
