'use client';

import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { now } from 'mobx-utils';
import { DateTime } from 'luxon';
import { useIsSSR } from '@react-aria/ssr';

const timeInSeconds = computed(() => {
  const epoch = now(1000);
  return DateTime.fromMillis(epoch).set({ millisecond: 0 }).toISOTime({
    includeOffset: false,
    suppressMilliseconds: true,
  });
});

export const Clock = observer(function Clock() {
  const isSSR = useIsSSR();
  return (
    <div className="tabular-nums text-[20vw]">
      {isSSR ? '00:00:00' : timeInSeconds.get()}
    </div>
  );
});
