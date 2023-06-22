import DB from '../common/db';

import * as Utilities from '../common/utilities';
import * as Lotus from '../common/lotus';

const NAME = `analysis-client.js`;

const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

console.log(`RUNNING: ${NAME}`);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function print({ address, copy }) {
  console.log(`\x1b[1m\x1b[37m\[${address}\]\x1b[0m : ${copy}`);
}

async function run() {
  const targetDate = new Date('2023-06-10');
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  // +1 to handle zero.
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  const nameSpaces = await fetch('https://cpistats.estuary.tech/report.json', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const names = await nameSpaces.json();
  console.log(names);
  for (const client of names) {
    const name = client.name.replace('customer-', '');
    await sleep(1000);
    console.log(`querying-${name}-edge: signature - ${name}-${daysDiff}`);

    let edgeData = {
      total_e2e_deals_in_bytes: 0,
      total_e2e_deals: 0,
      total_import_deals: 0,
      total_import_deals_in_bytes: 0,
      total_storage_allocated: 0,
      total_sealed_deal_in_bytes: 0,
    };
    try {
      const edge = await fetch(`https://${name}.edge.estuary.tech/stats`, {
        method: 'GET',
        headers: REQUEST_HEADERS,
      });
      edgeData = await edge.json();
    } catch (e) {
      console.log(`edge did not work`);
    }

    await sleep(1000);
    console.log(`querying-${name}-delta`);
    let deltaData = {
      total_content_count: 0,
      total_size: 0,
    };
    try {
      const delta = await fetch(`https://${name}.delta.estuary.tech/open/stats/totals/info`, {
        method: 'GET',
        headers: REQUEST_HEADERS,
      });
      deltaData = await delta.json();
    } catch (e) {
      console.log(`delta did not work`);
    }

    let store = {
      client_name: name,
      client_days_ago_signature: `${name}-${daysDiff}`,
      delta_total_e2e_deals_in_bytes: deltaData.total_e2e_deals_in_bytes,
      delta_total_e2e_deals: deltaData.total_e2e_deals,
      delta_total_import_deals: deltaData.total_import_deals,
      delta_total_import_deals_in_bytes: deltaData.total_import_deals_in_bytes,
      delta_total_storage_allocated: deltaData.total_storage_allocated,
      delta_total_sealed_deal_in_bytes: deltaData.total_sealed_deal_in_bytes,
      edge_total_content_count: edgeData.total_content_count,
      edge_total_size: edgeData.total_size,
    };

    if (!store.edge_total_size && !store.total_sealed_deal_in_bytes) {
      console.log(`skipping ${name} because of zero usage.`);
      continue;
    }

    console.log(`writing-${name} to DB:`);
    console.log(store);

    await sleep(1000);

    try {
      await Utilities.runQuery({
        queryFn: async () => {
          const save = await DB.insert({
            ...store,
          })
            .into('client_onboarding_table')
            .returning('*');
          console.log(save);
        },
        errorFn: (e) => {
          console.log(e);
        },
        label: `WRITE_EDGE_DELTA_DATA_FOR_CLIENT-${name}`,
      });
    } catch (e) {
      console.log(`writing-${name} FAILED`);
    }
  }

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
