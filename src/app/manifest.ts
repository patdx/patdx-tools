import { MetadataRoute } from 'next';
import android192 from './android-chrome-192x192.png';
import android512 from './android-chrome-512x512.png';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Patdx Tools',
    short_name: 'PTools',
    icons: [
      {
        src: android192.src,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: android512.src,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
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
