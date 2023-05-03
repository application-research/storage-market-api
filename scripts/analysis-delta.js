import DB from '../common/db';

import * as Utilities from '../common/utilities';
import * as Lotus from '../common/lotus';

const NAME = `analysis-delta.js`;

console.log(`RUNNING: ${NAME}`);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function print({ address, copy }) {
  console.log(`\x1b[1m\x1b[37m\[${address}\]\x1b[0m : ${copy}`);
}

async function run() {
  const response = await fetch(`https://global.delta.store/open/stats/totals/info`);
  const queryResponse = await response.json();

  const store = {
    total_deals_attempted: queryResponse.total_deals_attempted,
    total_e2e_deals_attempted: queryResponse.total_e2e_deals_attempted,
    total_import_deals_attempted: queryResponse.total_import_deals_attempted,
    total_piece_commitments_compute_attempted: queryResponse.total_piece_commitments_compute_attempted,
    total_deals_attempted_size: queryResponse.total_deals_attempted_size,
    total_e2e_deals_attempted_size: queryResponse.total_e2e_deals_attempted_size,
    total_import_deals_attempted_size: queryResponse.total_import_deals_attempted_size,
    total_piece_commitments_compute_attempted_size: queryResponse.total_piece_commitments_compute_attempted_size,
    total_deals_succeeded: queryResponse.total_deals_succeeded,
    total_e2e_succeeded: queryResponse.total_e2e_succeeded,
    total_import_succeeded: queryResponse.total_import_succeeded,
    total_piece_commitments_compute_succeeded: queryResponse.total_piece_commitments_compute_succeeded,
    total_deals_succeeded_size: queryResponse.total_deals_succeeded_size,
    total_e2e_succeeded_size: queryResponse.total_e2e_succeeded_size,
    total_import_succeeded_size: queryResponse.total_import_succeeded_size,
    total_piece_commitments_compute_succeeded_size: queryResponse.total_piece_commitments_compute_succeeded_size,
    total_in_progress_deals_24h: queryResponse.total_in_progress_deals_24h,
    total_in_progress_e2e_deals_24h: queryResponse.total_in_progress_e2e_deals_24h,
    total_in_progress_import_deals_24h: queryResponse.total_in_progress_import_deals_24h,
    total_number_of_sps_worked_with: queryResponse.total_number_of_sps_worked_with,
    total_number_of_unique_delta_nodes: queryResponse.total_number_of_unique_delta_nodes,
  };

  await Utilities.runQuery({
    queryFn: async () => {
      const save = await DB.insert({
        ...store,
      })
        .into('delta_analytics')
        .returning('*');
      console.log(save);
    },
    errorFn: (e) => {
      console.log(e);
    },
    label: `WRITE_DELTA_DATA`,
  });

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
