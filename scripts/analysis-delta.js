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

const sendMessage = async ({ store, url }) => {
  const targetDate = new Date('2023-05-01');
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  // +1 to handle zero.
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  const countDeltaNodes = store.total_number_of_unique_delta_nodes ? store.total_number_of_unique_delta_nodes : 100;

  const countSPs = store.total_number_of_sps_worked_with ? store.total_number_of_sps_worked_with : 105;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `👋 Hey! I have a report for you on the Outercore:Engineering effort to onboard data to the Filecoin Network since 2023-05-01 which was ${daysDiff} ago.\n\n*Keep up the good work team team!*\n\n`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `\n\n*Unique Delta Nodes ➝* ${countDeltaNodes}\n\n`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Participating Storage Providers ➝* ${countSPs}\n\n`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Total data onboarded onto the Filecoin Network ➝* ${Utilities.bytesToSize(store.total_deals_succeeded_size)}\n\n`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Moving average of onboarding ➝* ${Utilities.bytesToSize(
              store.total_deals_succeeded_size / daysDiff
            )}\n_Hypothetically we could have a moving average of ${Utilities.bytesToSize(
              (store.total_deals_succeeded_size * 1000) / daysDiff
            )} once we scale out the tooling._\n\n`,
          },
        },
      ],
    }),
  });
};

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

  if (!queryResponse.total_number_of_unique_delta_nodes) {
    console.log('Error: Could not query for total_number_of_unique_delta_nodes');
    return process.exit(0);
  }

  if (!queryResponse.total_number_of_sps_worked_with) {
    console.log('Error: Could not query for total_number_of_sps_worked_with');
    return process.exit(0);
  }

  let lastWriteEntry = null;
  try {
    lastWriteEntry = await DB.select()
      .from('delta_analytics')
      .orderBy('created_at', 'desc')
      .first();
  } catch (e) {
    console.log('can not query the latest analytics');
    return process.exit(0);
  }

  const targetDate = new Date(lastWriteEntry.created_at);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  console.log(daysDiff);

  if (daysDiff < 1) {
    console.log('Error: Already logged for the day');
    return process.exit(0);
  }

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
      return process.exit(0);
    },
    label: `WRITE_DELTA_DATA`,
  });

  const url = process.env.SLACK_WEB_HOOK_URL;
  await sendMessage({ url, store });

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
