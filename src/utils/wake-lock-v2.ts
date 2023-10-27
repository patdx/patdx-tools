import { createMachine, assign, interpret } from 'xstate';

interface Context {
  lock: WakeLockSentinel | null;
  error: Error | null;
}

type Event =
  | { type: 'LOCK' }
  | { type: 'UNLOCK' }
  | { type: 'RECEIVED_RELEASE_EVENT' };

const wakeLockMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHcCGBrMBaANgewGN0sAXAJ1SLDIDoywcxVZIBiAGQHkBhAaQG0ADAF1EoAA55YASxLS8AOzEgAHogDsADgDMNAIwBOAKzbtANgBMBzWYAstiwBoQAT0QX1gmme23LRwXUTTSMDAF8w5zRMXEJickpMWnwqCFYAVQA5Lj4hUSQQSRk5RWU1BD1QmgtfbSDnNwQLQQtqgMEOizs-TwsIqIxsFPiKKmS46QUoDh5eAH0AZXTubgBRBYW85SLZeSUC8vVbXRCDW0FtAM0rI4bETT0aWwMX6zMfPR0jM36QaKG4qRRkk6AwmDIphlsrNFss1hstgUdiV9qBysdWkYLF11BYjEY9F0zHp1HcmoIzDQDHp3u8DNo9HpTGYjL9-rEiEDEtQaMNJtMcvMAGIAQQAkuxVgARRESKS7UoHDR2bx4wQkgyCWzqQkGMnNXTU2kmKwhFp9SJ-QYckbc8apVgAJVWazFADVpXNnZKRQtVnNVh7MgAVWWFeUosqISoGaq1equRDabFU15vD5fbRs63DLljUGMZj8qGCuaiiXSsPIvZRpqaWw0QIPExXG62MmEhsE74knwBXF+CKWhR4CBwZTs3MJMbbCM1pUILBmMlLxsdDpM8wPOzacKWyeA6cg+iFlgQWfFedoxCWVqXM4XVsGW6Jpp6Lzr9ddexmdTZmJTsCPJ8lMF4KqiqiIAYXQ0CYhJmJqmiaC8gh6q+zSUkatL0oyzKsvuOaHkB9qYOeSJzoq14IA4ZKajQdTtC03R0nuAwAURdoFuC-JgZGC4WA8NBaISWhPi+jSfF2lTEuofaBBYg5DkAA */
    id: 'wake-lock-tracker',
    predictableActionArguments: true,
    tsTypes: {} as import('./wake-lock-v2.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Event,
      services: {} as {
        requestLock: {
          // The data that gets returned from the service
          data: WakeLockSentinel;
        };
      },
    },
    context: {
      lock: null,
      error: null,
    },
    initial: 'released',
    states: {
      released: {
        on: {
          LOCK: 'locking',
        },
      },
      locking: {
        invoke: {
          src: 'requestLock',
          onDone: {
            target: 'locked',
            actions: 'saveLock',
          },
          onError: {
            target: 'released',
            actions: 'saveError',
          },
        },
      },
      locked: {
        invoke: {
          src: 'listenForRelease',
        },
        on: {
          UNLOCK: 'releasing',
          RECEIVED_RELEASE_EVENT: {
            target: 'released',
            actions: 'unsaveLock',
          },
        },
      },
      releasing: {
        invoke: {
          src: 'requestRelease',
          onDone: {
            target: 'released',
            actions: 'unsaveLock',
          },
          onError: {
            target: 'locked',
            actions: 'saveError',
          },
        },
      },
    },
  },
  {
    services: {
      requestLock: async () => {
        const lock = await navigator.wakeLock.request('screen');
        return lock;
      },
      listenForRelease: (context, event) => (callback, _onReceive) => {
        const lock = context.lock;
        if (!lock) {
          throw new Error('Missing lock');
        }

        function handleRelease() {
          callback({ type: 'RECEIVED_RELEASE_EVENT' });
        }

        lock.addEventListener('release', handleRelease);

        return () => {
          lock.removeEventListener('release', handleRelease);
        };
      },
      requestRelease: async (context) => {
        await context.lock?.release();
      },
    },
    actions: {
      saveLock: assign({ lock: (context, event) => event.data }),
      saveError: assign({ error: (context, event) => event.data as any }),
      unsaveLock: assign({ lock: null }),
    },
  },
);

// shared service
export const wakeLockService = interpret(wakeLockMachine)
  .onTransition((state) => {
    console.log(state.value);
  })
  .start();
