<script setup lang="ts">
import { Checkbox } from 'flowbite-vue';
import { Observer } from 'mobx-vue-lite';

const state = clockState;
</script>

<template>
  <Observer>
    <div className="p-2 text-xl">
      <div className="flex items-center gap-1">
        <Checkbox
          id="seconds-checkbox"
          :model-value="state.showSeconds"
          @update:model-value="state.toggleShowSeconds"
          label="Show seconds"
        />
      </div>

      <div className="flex items-center gap-1">
        <Checkbox
          size="{20}"
          id="time24-checkbox"
          checked="{state.show24}"
          onChange="{state.toggleShow24}"
          label="Use 24 time"
        />
      </div>
    </div>
  </Observer>
</template>
