// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.wake-lock-tracker.locking:invocation[0]': {
      type: 'done.invoke.wake-lock-tracker.locking:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.wake-lock-tracker.releasing:invocation[0]': {
      type: 'done.invoke.wake-lock-tracker.releasing:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.wake-lock-tracker.locking:invocation[0]': {
      type: 'error.platform.wake-lock-tracker.locking:invocation[0]';
      data: unknown;
    };
    'error.platform.wake-lock-tracker.releasing:invocation[0]': {
      type: 'error.platform.wake-lock-tracker.releasing:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    listenForRelease: 'done.invoke.wake-lock-tracker.locked:invocation[0]';
    requestLock: 'done.invoke.wake-lock-tracker.locking:invocation[0]';
    requestRelease: 'done.invoke.wake-lock-tracker.releasing:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    saveError:
      | 'error.platform.wake-lock-tracker.locking:invocation[0]'
      | 'error.platform.wake-lock-tracker.releasing:invocation[0]';
    saveLock: 'done.invoke.wake-lock-tracker.locking:invocation[0]';
    unsaveLock:
      | 'RECEIVED_RELEASE_EVENT'
      | 'done.invoke.wake-lock-tracker.releasing:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    listenForRelease:
      | 'done.invoke.wake-lock-tracker.locking:invocation[0]'
      | 'error.platform.wake-lock-tracker.releasing:invocation[0]';
    requestLock: 'LOCK';
    requestRelease: 'UNLOCK';
  };
  matchesStates: 'locked' | 'locking' | 'released' | 'releasing';
  tags: never;
}
