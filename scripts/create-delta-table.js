import DB from '../common/db';

const NAME = `create-delta-table.js`;

console.log(`RUNNING: ${NAME}`);

/*
const createDeltaAnalyticsTable = DB.schema.createTable('delta_analytics', function(table) {
  table
    .uuid('id')
    .primary()
    .unique()
    .notNullable()
    .defaultTo(DB.raw('gen_random_uuid()'));
  table
    .string('total_deals_attempted')
    .unique()
    .notNullable();
  table.string('total_e2e_deals_attempted').nullable();
  table.string('total_import_deals_attempted').nullable();
  table.string('total_piece_commitments_compute_attempted').nullable();
  table.string('total_deals_attempted_size').nullable();
  table.string('total_e2e_deals_attempted_size').nullable();
  table.string('total_import_deals_attempted_size').nullable();
  table.string('total_piece_commitments_compute_attempted_size').nullable();
  table.string('total_deals_succeeded').nullable();
  table.string('total_e2e_succeeded').nullable();
  table.string('total_import_succeeded').nullable();
  table.string('total_piece_commitments_compute_succeeded').nullable();
  table.string('total_deals_succeeded_size').nullable();
  table.string('total_e2e_succeeded_size').nullable();
  table.string('total_import_succeeded_size').nullable();
  table.string('total_piece_commitments_compute_succeeded_size').nullable();
  table.string('total_in_progress_deals_24h').nullable();
  table.string('total_in_progress_e2e_deals_24h').nullable();
  table.string('total_in_progress_import_deals_24h').nullable();
  table.string('total_number_of_sps_worked_with').nullable();
  table.string('total_number_of_unique_delta_nodes').nullable();
  table
    .timestamp('created_at')
    .notNullable()
    .defaultTo(DB.raw('now()'));
});
*/

const createDeltaAnalyticsTable = DB.schema.createTable('client_onboarding_table', function(table) {
  table
    .uuid('id')
    .primary()
    .unique()
    .notNullable()
    .defaultTo(DB.raw('gen_random_uuid()'));
  table.string('client_name').nullable();
  table
    .string('client_days_ago_signature')
    .unique()
    .notNullable();
  table.string('delta_total_e2e_deals_in_bytes').nullable();
  table.string('delta_total_e2e_deals').nullable();
  table.string('delta_total_import_deals').nullable();
  table.string('delta_total_import_deals_in_bytes').nullable();
  table.string('delta_total_storage_allocated').nullable();
  table.string('delta_total_sealed_deal_in_bytes').nullable();
  table.string('edge_total_content_count').nullable();
  table.string('edge_total_size').nullable();
  table
    .timestamp('created_at')
    .notNullable()
    .defaultTo(DB.raw('now()'));
});

async function run() {
  await createDeltaAnalyticsTable;

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
