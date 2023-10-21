import { runInAction } from 'mobx';

const wakeLockTracker = shallowReactive({
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

watch(
  () =>
    wakeLockTracker.targetStatus === 'locked' &&
    wakeLockTracker.status === 'released',
  async (ready) => {
    if (!ready) return;

    try {
      const promise = navigator.wakeLock.request('screen');

      // runInAction(() => {
      wakeLockTracker.wakeLockPromise = promise;
      wakeLockTracker.status = 'locking';
      // });

      const wakeLock = await promise;

      // runInAction(() => {
      wakeLockTracker.wakeLockPromise = null;
      wakeLockTracker.wakeLock = wakeLock;
      wakeLockTracker.status = 'locked';
      // });

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

watch(
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

export const useWakeLock = () => {
  onMounted(() => {
    wakeLockTracker.lock();
  });
  onUnmounted(() => {
    wakeLockTracker.release();
  });
};
