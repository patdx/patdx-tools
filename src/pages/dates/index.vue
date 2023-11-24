<script setup lang="tsx">
import { schema, drizzleDb } from '~/db/database';

console.log(drizzleDb);

const { data, pending, error, refresh } = await useAsyncData('dates', () =>
  drizzleDb.select().from(schema.dates).orderBy(schema.dates.nextEvent),
);

// for (const date of allDates) {
//   getDateInfo(date.date!);
// }

// console.log(allDates);

async function addExampleDates() {
  await insertDate({
    date: '1970-06-01',
    name: 'My Birthday',
    emoji: '🎂',
  });

  await insertDate({
    date: '12-25',
    name: 'Christmas',
    emoji: '🎄',
  });

  await insertDate({
    date: '11-25',
    name: 'Today',
    emoji: '😄',
  });

  refresh();
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="px-2 pt-2 text-lg font-bold">Dates</h2>
    <h3 class="px-2">Coming up...</h3>
    <DateSelector v-for="date in data" :date="date" />
    <div v-if="data?.length === 0" class="px-2">
      No dates yet.
      <button class="rounded bg-gray-300 p-1" @click="addExampleDates()">
        Add some example items?
      </button>
    </div>
  </div>
</template>
