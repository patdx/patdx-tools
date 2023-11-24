import {
  ChronoUnit,
  LocalDate,
  MonthDay,
  ZoneOffset,
  convert,
  nativeJs,
} from '@js-joda/core';
import { RRule } from 'rrule';
import { drizzleDb, schema } from '~/db/database';
import type { InsertDate } from '~/db/schema';

// TODO: I think js-joda is relatively heavy...
export function getDateInfo(str: string): {
  next: string;
  days: number;
} {
  // Input: YYYY-MM-DD, or MM-DD
  // Output:
  // 1. Next (yearly) date
  // 2. How many days until

  if (str.split('-').length === 3) {
    // YYYY-MM-DD

    const eventJsDate = convert(LocalDate.parse(str), ZoneOffset.UTC).toDate();
    // console.log(converted, JSON.stringify(converted));
    const rule = new RRule({
      freq: RRule.YEARLY,
      dtstart: eventJsDate,
    });

    const todayLocalDate = LocalDate.now();
    const todayJsDate = convert(todayLocalDate, ZoneOffset.UTC).toDate();

    const nextJsDate = rule.after(todayJsDate, true);

    const nextLocalDate = LocalDate.from(nativeJs(nextJsDate, ZoneOffset.UTC));

    const days = todayLocalDate.until(nextLocalDate, ChronoUnit.DAYS);

    console.log(`next time: ${JSON.stringify(nextLocalDate)}, ${days}`);

    return {
      next: nextLocalDate.toJSON(),
      days: days,
    };
  } else if (str.split('-').length === 2) {
    // MM-DD

    const eventMonthDay = MonthDay.parse('--' + str);

    // next event is either this year or next year

    // as this year
    const todayLocalDate = LocalDate.now();
    const thisYearLocalDate = eventMonthDay.atYear(new Date().getFullYear());

    const nextLocalDate =
      thisYearLocalDate.isAfter(todayLocalDate) ||
      thisYearLocalDate.isEqual(todayLocalDate)
        ? thisYearLocalDate
        : thisYearLocalDate.plusYears(1);

    const days = todayLocalDate.until(nextLocalDate, ChronoUnit.DAYS);

    console.log(`next time: ${JSON.stringify(nextLocalDate)}, ${days}`);

    return {
      next: nextLocalDate.toJSON(),
      days: days,
    };
  } else {
    throw new Error('Invalid date format');
  }
}

export async function insertDate({
  date,
  name,
  emoji,
}: Pick<InsertDate, 'date' | 'name' | 'emoji'>) {
  const id = crypto.randomUUID();
  const info = getDateInfo(date);

  await drizzleDb.insert(schema.dates).values({
    id,
    date,
    name,
    emoji,
    // NOTE: preload the next event to make it easier to sort
    nextEvent: info.next,
  });
}
