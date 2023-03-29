import DB from '../common/db';

const NAME = `create-ingress-egress-table.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('ingress_egress', function (table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('gen_random_uuid()'));
  table.string('name').nullable();
  table.string('location').nullable();
  table.string('data_transfer').nullable();
  table.string('ingress_cost_per_month_cents').nullable();
  table.string('egress_cost_per_month_cents').nullable();
  table.string('src_logo').nullable();
  table.string('web3').nullable();
  table.string('url').nullable();
  table.jsonb('metadata').nullable();
  table.jsonb('links').nullable();
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
