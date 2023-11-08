<script setup lang="tsx">
import { FwbButton } from 'flowbite-vue';

function getRandomInt() {
  return Math.floor(Math.random() * max.value) + 1;
}

function handleClick() {
  const oldNumber = number.value;
  if (oldNumber != null) {
    oldNumbers.value.push({
      turn: turn.value,
      number: oldNumber,
    });
    if (oldNumbers.value.length > 8) {
      oldNumbers.value.shift();
    }
  }

  number.value = getRandomInt();
  turn.value++;
}

const OPTIONS = [6, 8, 10];
let max = ref(OPTIONS[0]);

let oldNumbers = ref<{ turn: number; number: number }[]>([]);
let turn = ref(0);
let number = ref<null | number>(null);

onMounted(() => {
  handleClick();
});
</script>

<template>
  <div
    class="flex h-full flex-1 flex-col items-center justify-center gap-12 p-2 text-center"
  >
    <div class="flex h-6 w-[15.5rem] gap-2 overflow-hidden">
      <TransitionGroup
        enter-from-class="opacity-0 translate-x-6"
        enter-to-class="opacity-100 translate-x-0"
        enter-active-class="transition"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-6"
        leave-active-class="transition absolute"
        move-class="transition"
      >
        <div
          v-for="item in oldNumbers"
          :key="item.turn"
          :data-turn="item.turn"
          class="flex h-6 w-6 flex-none items-center justify-center rounded border p-1 tabular-nums"
        >
          {{ item.number }}
        </div>
      </TransitionGroup>
    </div>
    <div
      class="relative h-40 w-40 overflow-clip rounded border border-gray-500 p-4"
    >
      <Transition
        enter-from-class="translate-x-40"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-40"
      >
        <div
          :key="turn"
          class="absolute inset-0 flex items-center justify-center text-9xl tabular-nums transition"
        >
          {{ number }}
        </div>
      </Transition>
    </div>
    <FwbButton size="xl" @click="handleClick">Roll again</FwbButton>
    <div class="grid auto-cols-fr grid-flow-col gap-2">
      <FwbButton
        v-for="option in OPTIONS"
        :key="option"
        color="light"
        :class="max === option && 'underline'"
        @click="max = option"
        size="lg"
        >Max {{ option }}</FwbButton
      >
    </div>
  </div>
</template>
