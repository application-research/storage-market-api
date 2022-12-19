import DB from '../common/db';

const NAME = `create.js`;

console.log(`RUNNING: ${NAME}`);

const updateRun = DB.schema.table('filecoin_storage_providers', function (table) {
  table.timestamp('created_at').notNullable().defaultTo(DB.raw('now()'));
  table.timestamp('updated_at').notNullable().defaultTo(DB.raw('now()'));
});

async function run() {
  await Promise.all([updateRun]);
  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
