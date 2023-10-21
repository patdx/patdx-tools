<script setup lang="ts">
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
  <div class="flex flex-col h-screen">
    <div
      class="sticky left-0 right-0 top-0 z-10 flex flex-none justify-center border-b border-eggplant bg-eggplant-900 text-eggplant shadow-md pt-safe pr-safe pl-safe dark:bg-eggplant-100 landscape:hidden"
    >
      <div class="p-2">
        <img src="~/assets/images/src/icon.png" alt="Logo" class="h-6 w-6" />
      </div>
    </div>
    <div
      class="relative flex flex-1 flex-col text-eggplant dark:bg-black dark:text-eggplant-700"
    >
      <NuxtPage />
    </div>
    <div
      class="sticky bottom-0 left-0 right-0 flex-none border-t border-eggplant bg-eggplant-900 pb-safe dark:bg-eggplant-100"
    >
      <div class="flex h-8 items-stretch justify-center">
        <MyLink href="/">Home</MyLink>
        <MyLink href="/clock">Clock</MyLink>
        <MyLink href="/about">About</MyLink>
      </div>
    </div>
  </div>
</template>
