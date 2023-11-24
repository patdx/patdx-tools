import * as schema from './schema';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import SQLiteESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs';
import * as SQLite from 'wa-sqlite';
import { once } from 'lodash-es';
import theWasm from 'wa-sqlite/dist/wa-sqlite-async.wasm?url';
// import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js';

export { schema };

const getWaSqlite = once(async () => {
  const module = await SQLiteESMFactory({
    locateFile: () => {
      // console.log('resolved path ' + theWasm);
      // dist/wa-sqlite.wasm
      return theWasm;
    },
  });

  const migrations = import.meta.glob('./drizzle/*.sql', {
    as: 'raw',
    eager: true,
  });

  // Here's the best example I can find of how to set up VFS:
  // https://github.com/rhashimoto/wa-sqlite/blob/7a48dd77b34cf75cddf65b9d3fd105be63a214be/demo/demo-worker.js#L40C16-L40C25

  const sqlite3 = SQLite.Factory(module);

  // const vfs = new IDBBatchAtomicVFS();
  // await vfs.isReady;
  // sqlite3.vfs_register(vfs, true);

  const db = await sqlite3.open_v2('myDB');

  for (const migration of Object.entries(migrations).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    const [name, sql] = migration;
    console.log(`Running migration ${name}:` + '\n' + sql);

    await sqlite3.exec(db, sql);
  }

  await sqlite3.exec(
    db,
    'CREATE TABLE IF NOT EXISTS `dates` (`id` text PRIMARY KEY NOT NULL,`name` text,`date` text);',
    (row, columns) => {
      console.log({ row, columns });
    },
  );

  console.log(sqlite3, db);

  return { sqlite3, db };
});

if (!import.meta.env.SSR) {
  getWaSqlite();
}

export const drizzleDb = drizzle(
  async (sql, params, method) => {
    try {
      const { sqlite3, db } = await getWaSqlite();

      let rows: any[] = [];
      let columns: string[] | null = null;
      let done = false;

      for await (const stmt of sqlite3.statements(db, sql)) {
        sqlite3.bind_collection(stmt, params);
        if (done) {
          throw new Error(`Got multiple statements but should only have one`);
        }
        while ((await sqlite3.step(stmt)) === SQLite.SQLITE_ROW) {
          columns = columns ?? sqlite3.column_names(stmt);
          rows.push(sqlite3.row(stmt));
        }
        done = true;
      }

      console.log({ rows, columns });

      return { rows };
    } catch (e: any) {
      console.error('Error from sqlite proxy server: ', String(e));
      return { rows: [] };
    }
  },
  {
    schema,
    logger: true,
  },
);
