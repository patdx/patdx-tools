<script setup lang="tsx">
import { FwbButton } from 'flowbite-vue';

function getRandomInt() {
  return Math.floor(Math.random() * 6) + 1;
}

function handleClick() {
  const oldNumber = number.value;
  if (oldNumber != null) {
    oldNumbers.value.push(oldNumber);
  }

  number.value = getRandomInt();
  turn.value++;
}
let oldNumbers = ref<number[]>([]);
let turn = ref(0);
let number = ref<null | number>(null);
</script>

<template>
  <div
    class="flex h-full flex-1 flex-col items-center justify-center gap-12 p-2 text-center"
  >
    <div>
      <div>Previous numbers</div>

      <TransitionGroup
        tag="div"
        class="flex w-64 flex-wrap gap-2"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        enter-active-class="transition"
      >
        <div
          v-for="(number, index) in oldNumbers"
          :key="index"
          class="flex h-6 w-6 items-center justify-center rounded border p-1 tabular-nums"
        >
          {{ number }}
        </div>
      </TransitionGroup>
    </div>
    <div
      class="relative h-32 w-32 overflow-clip rounded border border-gray-500 p-4"
    >
      <Transition
        enter-from-class="translate-x-32"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-32"
      >
        <div
          :key="turn"
          class="absolute inset-0 flex items-center justify-center text-8xl tabular-nums transition"
        >
          {{ number }}
        </div>
      </Transition>
    </div>
    <FwbButton size="xl" @click="handleClick"> Roll the dice </FwbButton>
  </div>
</template>
