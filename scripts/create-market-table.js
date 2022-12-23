import DB from '../common/db';

const NAME = `create-market-table.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('market', function(table) {
  table
    .uuid('id')
    .primary()
    .unique()
    .notNullable()
    .defaultTo(DB.raw('uuid_generate_v4()'));
  table.string('name').nullable();
  table.string('limit_storage_amount_bytes').nullable();
  table.string('bytes_per_day_cents').nullable();
  table.string('bytes_per_month_cents').nullable();
  table.string('bytes_per_year_cents').nullable();
  table.string('web3').nullable();
  table.string('replication_included').nullable();
  table.string('url').nullable();
  table.jsonb('metadata').nullable();
  table.jsonb('links').nullable();
  table.jsonb('data').nullable();
  table
    .timestamp('created_at')
    .notNullable()
    .defaultTo(DB.raw('now()'));
  table
    .timestamp('updated_at')
    .notNullable()
    .defaultTo(DB.raw('now()'));
  table.timestamp('deleted_at').nullable();
});

async function run() {
  await Promise.all([createRun]);
  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
