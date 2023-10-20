<script setup lang="ts">
const props = defineProps(['href']);
</script>
<template>
  <NuxtLink
    :to="props.href"
    class="flex items-center px-2 hover:bg-eggplant-800 active:bg-eggplant-800 dark:text-eggplant-600"
    ><slot
  /></NuxtLink>
</template>
