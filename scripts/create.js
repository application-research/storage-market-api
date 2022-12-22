import DB from '../common/db';

const NAME = `create.js`;

console.log(`RUNNING: ${NAME}`);

const createFilecoinStorageProvidersTable = DB.schema.createTable('filecoin_storage_providers', function (table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('uuid_generate_v4()'));
  table.string('address').unique().notNullable();
  table.string('address_of_owner').nullable();
  table.string('address_of_worker').nullable();
  table.string('address_of_beneficiary').nullable();
  table.string('sector_size_bytes').nullable();
  table.string('max_piece_size_bytes').nullable();
  table.string('min_piece_size_bytes').nullable();
  table.string('price_attofil').nullable();
  table.string('price_verified_attofil').nullable();
  table.string('balance_attofil').nullable();
  table.string('locked_funds_attofil').nullable();
  table.string('initial_pledge_attofil').nullable();
  table.string('raw_power_bytes').nullable();
  table.string('quality_adjusted_power_bytes').nullable();
  table.string('total_raw_power_bytes').nullable();
  table.string('total_quality_adjusted_power_bytes').nullable();
  table.string('total_storage_deal_count').nullable();
  table.string('total_sectors_sealed_by_post_count').nullable();
  table.string('peer_id').nullable();
  table.string('height').nullable();
  table.string('lotus_version').nullable();
  table.jsonb('multiaddrs').nullable();
  table.jsonb('metadata').nullable();
  table.jsonb('address_of_controllers').nullable();
  table.jsonb('tipset').nullable();
  table.timestamp('created_at').notNullable().defaultTo(DB.raw('now()'));
  table.timestamp('updated_at').notNullable().defaultTo(DB.raw('now()'));
});

const createRetrievalStatsTable = DB.schema.createTable('retrievals_stats', function(table) {
  table.uuid('id').primary().unique().notNullable().defaultTo(DB.raw('uuid_generate_v4()'));
  table.string("sp_address").unique().notNullable().references('address').inTable('filecoin_storage_providers');
  table.integer("count_success").nullable();
  table.integer("count_fail").nullable();
})

async function run() {
  await createFilecoinStorageProvidersTable;
  await createRetrievalStatsTable;

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
