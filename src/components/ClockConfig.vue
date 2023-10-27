<script setup lang="ts">
import { useActor } from '@xstate/vue';
import { FwbCheckbox } from 'flowbite-vue';
const { state, send } = useActor(wakeLockService);

const clockState = useClockStore();
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <div>Wake lock status: {{ state.value }}</div>
    <div v-if="state.context.error">Error: {{ state.context.error }}</div>
    <div class="flex items-center gap-1">
      <FwbCheckbox
        id="seconds-checkbox"
        :model-value="clockState.showSeconds"
        @update:model-value="clockState.toggleShowSeconds"
        label="Show seconds"
      />
    </div>

    <div class="flex items-center gap-1">
      <FwbCheckbox
        size="{20}"
        id="time24-checkbox"
        :model-value="clockState.show24"
        @update:model-value="clockState.toggleShow24"
        label="Use 24 time"
      />
    </div>
  </div>
</template>
