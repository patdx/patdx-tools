export default defineEventHandler((event) => {
  return {
    name: 'PTools',
    short_name: 'PTools',
    icons: [
      {
        src: '/images/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#dfd9df',
    background_color: '#ffffff',
    display: 'standalone',
    id: '/',
    start_url: '/',
  };
});
