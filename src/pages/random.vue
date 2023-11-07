<script setup lang="ts">
import { FwbButton } from 'flowbite-vue';

function getRandomInt() {
  return Math.floor(Math.random() * 6) + 1;
}

function handleClick() {
  number.value = getRandomInt();
}

let number = ref<null | number>(null);
</script>

<template>
  <div
    class="flex h-full flex-1 flex-col items-center justify-center gap-4 p-2 text-center"
  >
    <div class="rounded border border-gray-500 p-4 text-6xl tabular-nums">
      {{ number || '&nbsp;' }}
    </div>
    <FwbButton @click="handleClick"> Roll the dice </FwbButton>
  </div>
</template>
