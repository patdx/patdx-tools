import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:./database.sqlite',
  },
} satisfies Config;
