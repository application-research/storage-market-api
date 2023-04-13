import DB from '../common/db';

const NAME = `create-fil-user-explorer-industry-table.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('fil-user-explorer-industry', function (table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('gen_random_uuid()'));
  table.string('outgoing_datacap').nullable();
  table.string('industry').nullable();
  table.jsonb('year').nullable();
  table.string('week').nullable();
  table.jsonb('data').nullable();
  table.timestamp('created_at').notNullable().defaultTo(DB.raw('now()'));
  table.timestamp('updated_at').notNullable().defaultTo(DB.raw('now()'));
  table.timestamp('deleted_at').nullable();
});

async function run() {
  await Promise.all([createRun]);
  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
