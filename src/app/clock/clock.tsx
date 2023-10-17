'use client';

import { useIsSSR } from '@react-aria/ssr';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import {
  action,
  computed,
  makeAutoObservable,
  reaction,
  runInAction,
} from 'mobx';
import { observer } from 'mobx-react-lite';
import { now } from 'mobx-utils';
import { useEffect } from 'react';
import { Checkbox, Label } from 'flowbite-react';

const state = makeAutoObservable(
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
  },
);

export const Clock = observer(function Clock() {
  const isSSR = useIsSSR();

  useEffect(() => {
    wakeLockTracker.lock();
    return () => {
      wakeLockTracker.release();
    };
  }, []);

  return (
    <>
      {state.showConfig ? (
        <Config />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center dark:bg-black">
          <div
            className={clsx(
              'tabular-nums dark:text-eggplant-700',
              state.timeInSeconds.length > 8 ? 'text-[15vw]' : 'text-[20vw]',
            )}
          >
            {isSSR ? '00:00:00' : state.timeInSeconds}
          </div>
        </div>
      )}
      <button
        className={clsx(
          'absolute right-0 top-0 p-2 text-eggplant hover:underline active:underline dark:text-eggplant-700',
          state.showConfig && 'font-bold',
        )}
        onClick={state.toggleConfig}
      >
        Settings
      </button>
    </>
  );
});

const Config = observer(function Config() {
  return (
    <div className="p-2 text-xl">
      <div className="flex items-center gap-1">
        <Checkbox
          id="seconds-checkbox"
          checked={state.showSeconds}
          onChange={state.toggleShowSeconds}
        />
        <Label htmlFor="seconds-checkbox" className="flex-1">
          Show seconds
        </Label>
      </div>

      <div className="flex items-center gap-1">
        <Checkbox
          size={20}
          id="time24-checkbox"
          checked={state.show24}
          onChange={state.toggleShow24}
        />
        <Label htmlFor="time24-checkbox" className="flex-1">
          Use 24 time
        </Label>
      </div>
    </div>
  );
});

const wakeLockTracker = makeAutoObservable({
  targetStatus: 'released' as 'released' | 'locked',
  status: 'released' as 'released' | 'locking' | 'locked' | 'releasing',
  wakeLockPromise: null as Promise<WakeLockSentinel> | null,
  wakeLock: null as WakeLockSentinel | null,

  get isLocked() {
    return this.wakeLock != null;
  },
  async lock(): Promise<void> {
    this.targetStatus = 'locked';
  },
  async release(): Promise<void> {
    this.targetStatus = 'released';
  },
});

reaction(
  () =>
    wakeLockTracker.targetStatus === 'locked' &&
    wakeLockTracker.status === 'released',
  async (ready) => {
    if (!ready) return;

    try {
      const promise = navigator.wakeLock.request('screen');
      runInAction(() => {
        wakeLockTracker.wakeLockPromise = promise;
        wakeLockTracker.status = 'locking';
      });

      const wakeLock = await promise;
      runInAction(() => {
        wakeLockTracker.wakeLockPromise = null;
        wakeLockTracker.wakeLock = wakeLock;
        wakeLockTracker.status = 'locked';
      });

      // listen for our release event
      wakeLock.addEventListener('release', () => {
        console.log('Wake lock released');
        runInAction(() => {
          wakeLockTracker.wakeLock = null;
          wakeLockTracker.status = 'released';
        });
        // if wake lock is released alter the UI accordingly
      });
    } catch (err) {
      // if wake lock request fails - usually system related, such as battery
    }
  },
);

reaction(
  () =>
    wakeLockTracker.targetStatus === 'released' &&
    wakeLockTracker.status === 'locked',
  async (ready) => {
    if (!ready) return;

    console.log('Releasing');
    runInAction(() => {
      wakeLockTracker.status = 'releasing';
    });

    await wakeLockTracker.wakeLock?.release();

    console.log('Released');
    runInAction(() => {
      wakeLockTracker.wakeLock = null;
      wakeLockTracker.status = 'released';
    });
  },
);
