import DB from '../common/db';

const NAME = `create-fil-user-explorer-log.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('fil-user-explorer-log', function (table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('gen_random_uuid()'));
  table.string('address').nullable();
  table.string('address_id').unique().nullable();
  table.string('allowance').nullable();
  table.jsonb('allowance_array').nullable();
  table.string('audit_trail').nullable();
  table.integer('create_message_timestamp').nullable();
  table.integer('create_at_height').nullable();
  table.integer('deal_count').nullable();
  table.string('industry').nullable();
  table.string('initial_allowance').nullable();
  table.string('issue_create_timestamp').nullable();
  table.string('name').nullable();
  table.string('org_name').nullable();
  table.string('provider_count').nullable();
  table.string('received_datacap_change').nullable();
  table.string('region').nullable();
  table.integer('retries').nullable();
  table.string('top_provider').nullable();
  table.string('used_datacap_change').nullable();
  table.jsonb('used_dc').nullable();
  table.string('verifier_address_id').nullable();
  table.string('verifier_name').nullable();
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
