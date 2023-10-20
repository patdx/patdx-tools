import { DateTime } from 'luxon';
import { makeAutoObservable } from 'mobx';
import { now } from 'mobx-utils';

export const clockState = makeAutoObservable(
  {
    showConfig: false,
    toggleConfig() {
      this.showConfig = !this.showConfig;
    },

    showSeconds: true,
    toggleShowSeconds() {
      this.showSeconds = !this.showSeconds;
    },

    show24: true,
    toggleShow24() {
      this.show24 = !this.show24;
    },

    get timeInSeconds() {
      const epoch = now(1000);

      const formatter = this.show24
        ? this.showSeconds
          ? DateTime.TIME_24_WITH_SECONDS
          : DateTime.TIME_24_SIMPLE
        : this.showSeconds
        ? DateTime.TIME_WITH_SECONDS
        : DateTime.TIME_SIMPLE;

      return DateTime.fromMillis(epoch).toLocaleString(formatter);

      // .set({ millisecond: 0 }).toISOTime({
      //   includeOffset: false,
      //   suppressMilliseconds: true,
      //   suppressSeconds: !this.showSeconds,
      // });
    },
  },
  {},
  {
    autoBind: true,
  }
);
