<script setup lang="ts">
import RiHome2Line from '~icons/ri/home-2-line';
import RiTimeLine from '~icons/ri/time-line';
import RiInformationLine from '~icons/ri/information-line';
import RiMagicLine from '~icons/ri/magic-line';
import RiCalendar2Fill from '~icons/ri/calendar-2-fill';

useHead({
  title: 'PTools',
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
    { name: 'theme-color', content: '#dfd9df' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no',
    },
  ],
});
</script>

<template>
  <div class="contents">
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
