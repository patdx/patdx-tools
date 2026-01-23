import wasm from 'vite-plugin-wasm';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
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
    preset: 'static',
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
  vite: {
    // plugins: [wasm()],
  },
  routeRules: {
    // dates use sqlite locally
    // so do not support server side rendering
    '/dates/**/*': { ssr: false },
  },
});
