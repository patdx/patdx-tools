import { setHeader } from 'h3';

export default defineEventHandler((event) => {
  // Nitro serialises a returned object as `application/json`, and a manifest
  // served as the wrong type fails install with no useful error. The
  // `.webmanifest` extension gets this type for free; this route has to ask.
  // `src/public/_headers` repeats it for the prerendered static file, which has
  // no handler to set it.
  setHeader(event, 'content-type', 'application/manifest+json');

  return {
    name: 'PTools',
    short_name: 'PTools',
    id: '/',
    start_url: '/',
    display: 'standalone',
    lang: 'en',
    dir: 'ltr',
    launch_handler: { client_mode: 'navigate-existing' },
    theme_color: '#dfd9df',
    background_color: '#ffffff',
    icons: [
      // Tight `any` icons and padded `maskable` ones are separate files on
      // purpose: sharing one PNG shows the maskable padding as dead space on
      // Windows, Linux and the install dialog.
      {
        src: '/images/manifest-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/manifest-icon-512.png',
        sizes: '512x512',
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
        purpose: 'maskable',
      },
    ],
  };
});
