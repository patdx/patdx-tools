<script setup lang="ts">
import RiHome2Line from '~icons/ri/home-2-line';
import RiTimeLine from '~icons/ri/time-line';
import RiInformationLine from '~icons/ri/information-line';
import RiMagicLine from '~icons/ri/magic-line';
import RiCalendar2Fill from '~icons/ri/calendar-2-fill';

useHead({
  title: 'PTools',
  script: [
    {
      // iOS only, and only from the Home Screen: the status strip is shown for
      // standalone launches and hidden in a browser tab. Runs during setup, so
      // it is set before the app paints.
      innerHTML:
        "if(navigator.standalone===true)document.documentElement.dataset.standalone=''",
    },
  ],
  link: [
    { rel: 'manifest', href: '/manifest.json' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '196x196',
      href: '/images/favicon-196.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/images/apple-icon-180.png',
    },
  ],
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    // Falls back to <title> otherwise, and the home-screen label then differs
    // from the manifest's short_name.
    { name: 'apple-mobile-web-app-title', content: 'PTools' },
    // No `user-scalable=no`/`maximum-scale=1`: locking zoom is an accessibility
    // regression, and `touch-action: manipulation` already kills double-tap
    // zoom without it.
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
    // Ship both schemes rather than rewriting the tag at runtime.
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: light)',
      content: '#dfd9df',
    },
    {
      name: 'theme-color',
      media: '(prefers-color-scheme: dark)',
      content: '#000000',
    },
  ],
});
</script>

<template>
  <div class="contents">
    <div class="ios-status-strip" aria-hidden="true"></div>
    <!-- add extra wrapper element to fix hydration error (hydration of routes does not support fragment) -->
    <div
      class="relative flex flex-1 flex-col text-eggplant dark:bg-black dark:text-eggplant-700"
    >
      <NuxtPage />
    </div>
    <div
      class="sticky bottom-0 left-0 right-0 flex-none border-t border-eggplant bg-eggplant-900 pb-safe dark:bg-eggplant-100"
    >
      <div class="flex h-12 items-stretch justify-center">
        <MyLink href="/">
          <RiHome2Line />
          Home
        </MyLink>
        <MyLink href="/clock">
          <RiTimeLine />
          Clock
        </MyLink>
        <MyLink href="/dates">
          <RiCalendar2Fill />
          Dates
        </MyLink>
        <MyLink href="/random">
          <RiMagicLine />
          Random
        </MyLink>
        <MyLink href="/about">
          <RiInformationLine />
          About
        </MyLink>
      </div>
    </div>
  </div>
</template>
