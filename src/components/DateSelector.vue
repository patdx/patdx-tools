<script setup lang="ts">
import type { SelectDate } from '~/db/schema';

const props = defineProps<{
  date: SelectDate;
}>();

const daysRemaining = computed(() => getDateInfo(props.date.date!).days);
</script>

<template>
  <div class="px-2">
    <NuxtLink
      class="flex items-center gap-4 rounded-lg bg-blue-50 px-4 py-8 transition-colors hover:bg-blue-400"
      :to="`/dates/${date.id}`"
    >
      <!-- {{ date.id }} -->
      <div class="flex-none text-4xl leading-none text-black">
        {{ date.emoji }}
      </div>
      <div class="flex-1 whitespace-nowrap text-lg leading-5 text-black">
        <div>{{ date.name }}</div>
        <div class="text-sm text-gray-500">{{ date.date }}</div>
      </div>
      <div
        class="my-auto flex-none whitespace-nowrap text-right text-xl text-black"
      >
        in {{ daysRemaining }} days
      </div>
    </NuxtLink>
  </div>
</template>
