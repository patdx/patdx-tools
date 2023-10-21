import { DateTime } from 'luxon';

const timestamp = useTimestamp({
  interval: 1000,
});

export const useClockStore = defineStore('clock', {
  state: () => ({
    showConfig: false,
    showSeconds: true,
    show24: true,
  }),
  getters: {
    timeInSeconds: (state) => {
      const epoch = timestamp.value;

      const formatter = state.show24
        ? state.showSeconds
          ? DateTime.TIME_24_WITH_SECONDS
          : DateTime.TIME_24_SIMPLE
        : state.showSeconds
        ? DateTime.TIME_WITH_SECONDS
        : DateTime.TIME_SIMPLE;

      return DateTime.fromMillis(epoch).toLocaleString(formatter);
    },
  },
  actions: {
    toggleConfig() {
      this.showConfig = !this.showConfig;
    },
    toggleShow24() {
      this.show24 = !this.show24;
    },
    toggleShowSeconds() {
      this.showSeconds = !this.showSeconds;
    },
  },
});
