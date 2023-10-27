<script setup lang="ts">
const props = defineProps(['href']);
</script>
<template>
  <NuxtLink
    :to="props.href"
    class="flex flex-col items-center justify-center px-2 text-sm hover:bg-eggplant-800 active:bg-eggplant-800 dark:text-eggplant-600"
  >
    <slot />
  </NuxtLink>
</template>
