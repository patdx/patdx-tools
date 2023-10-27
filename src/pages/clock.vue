<script setup lang="ts">
import clsx from 'clsx';
import { useActor } from '@xstate/vue';

const { state, send } = useActor(wakeLockService);
onMounted(() => {
  send({ type: 'LOCK' });
});
onUnmounted(() => {
  send({ type: 'UNLOCK' });
});

const clockState = useClockStore();
</script>

<template>
  <ClockConfig v-if="clockState.showConfig" />
  <div
    v-else
    class="absolute inset-0 flex items-center justify-center dark:bg-black"
  >
    <div
      :class="
        clsx(
          'tabular-nums dark:text-eggplant-700',
          clockState.timeInSeconds.length > 8 ? 'text-[15vw]' : 'text-[20vw]',
        )
      "
    >
      <ClientOnly fallback="00:00:00">
        {{ clockState.timeInSeconds }}
      </ClientOnly>
      <!-- {isSSR ? '00:00:00' : state.timeInSeconds} -->
    </div>
  </div>
  <button
    :class="
      clsx(
        'absolute right-0 top-0 p-2 text-eggplant hover:underline active:underline dark:text-eggplant-700',
        clockState.showConfig && 'font-bold',
      )
    "
    @click="clockState.toggleConfig"
  >
    Settings
  </button>
</template>
