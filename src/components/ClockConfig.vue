<script setup lang="ts">
import { Checkbox } from 'flowbite-vue';

const clockState = useClockStore();
</script>

<template>
  <div class="p-2 text-xl">
    <div class="flex items-center gap-1">
      <Checkbox
        id="seconds-checkbox"
        :model-value="clockState.showSeconds"
        @update:model-value="clockState.toggleShowSeconds"
        label="Show seconds"
      />
    </div>

    <div class="flex items-center gap-1">
      <Checkbox
        size="{20}"
        id="time24-checkbox"
        :model-value="clockState.show24"
        @update:model-value="clockState.toggleShow24"
        label="Use 24 time"
      />
    </div>
  </div>
</template>
