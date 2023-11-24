<script setup lang="ts">
import { schema, drizzleDb } from '~/db/database';
import { eq } from 'drizzle-orm';

const id = useRoute().params.id as string;

const result = await drizzleDb
  .select()
  .from(schema.dates)
  .where(eq(schema.dates.id, id));

// note, for some reason findFirst() and get() are not returning single object as expected

const item = result[0];

const { emoji, date, name } = item ?? {};

const info = computed(() => getDateInfo(date));
</script>

<template>
  <NuxtLink
    to="/dates"
    class="flex flex-1 cursor-default flex-col items-center justify-center bg-red-400"
  >
    <div class="text-[150px] text-white">
      {{ emoji }}
    </div>
    <div class="mt-8 text-6xl text-white">{{ info.days }}</div>
    <div class="mt-8 text-4xl text-white">days remaining until</div>
    <div class="mt-8 text-center text-5xl text-white">
      {{ name }}
    </div>
    <div class="mt-8 text-lg text-white">Next occurrence: {{ info.next }}</div>
    <div class="absolute bottom-4 left-0 right-0 text-center text-white">
      Tap anywhere to close
    </div>
  </NuxtLink>
</template>
