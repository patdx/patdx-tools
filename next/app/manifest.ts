import { MetadataRoute } from 'next';

import android192 from '../../assets/out/manifest-icon-192.maskable.png';
import android512 from '../../assets/out/manifest-icon-512.maskable.png';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PTools',
    short_name: 'PTools',
    icons: [
      {
        src: android192.src,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: android192.src,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: android512.src,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: android512.src,
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
  //   return {
  //     name: 'Next.js App',
  //     short_name: 'Next.js App',
  //     description: 'Next.js App',
  //     start_url: '/',
  //     display: 'standalone',
  //     background_color: '#fff',
  //     theme_color: '#fff',
  //     icons: [
  //       {
  //         src: '/favicon.ico',
  //         sizes: 'any',
  //         type: 'image/x-icon',
  //       },
  //     ],
  //   }
}
