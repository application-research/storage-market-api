import DB from '../common/db';

const NAME = `create-fil-user-explorer-table.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('fil-user-explorer', function (table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('gen_random_uuid()'));
  table.string('address', 2000).nullable();
  table.string('address_id', 2000).unique().nullable();
  table.string('allowance', 2000).nullable();
  table.jsonb('allowance_array').nullable();
  table.string('audit_trail', 2000).nullable();
  table.integer('create_message_timestamp').nullable();
  table.integer('create_at_height').nullable();
  table.integer('deal_count').nullable();
  table.string('industry', 2000).nullable();
  table.string('initial_allowance', 2000).nullable();
  table.string('issue_create_timestamp', 2000).nullable();
  table.string('name', 2000).nullable();
  table.string('org_name', 2000).nullable();
  table.string('provider_count', 2000).nullable();
  table.string('received_datacap_change', 2000).nullable();
  table.string('region', 2000).nullable();
  table.integer('retries').nullable();
  table.string('top_provider', 2000).nullable();
  table.string('used_datacap_change', 2000).nullable();
  table.jsonb('used_dc').nullable();
  table.string('verifier_address_id', 2000).nullable();
  table.string('verifier_name', 2000).nullable();
  table.jsonb('website').nullable();
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
