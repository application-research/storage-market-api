import DB from '../common/db';

import * as Utilities from '../common/utilities';
import * as Lotus from '../common/lotus';

const NAME = `scan.js`;

console.log(`RUNNING: ${NAME}`);

function print({ address, copy }) {
  console.log(`\x1b[1m\x1b[37m\[${address}\]\x1b[0m : ${copy}`);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// NOTE(jim):
// We just use sources to scan for new miners.
async function run() {
  let storageProviders = [];
  const filrep = await fetch('https://api.filrep.io/api/v1/miners');
  const estuary = await fetch('https://api.estuary.tech/public/miners');
  let json = await filrep.json();
  storageProviders = [...storageProviders, ...json.miners];
  json = await estuary.json();

  let estuaryProviders = [];
  Object.keys(json).forEach((key) => {
    estuaryProviders.push(json[key]);
  });

  storageProviders = [...storageProviders, ...estuaryProviders];

  /*
  const client = Lotus.getClient();
  const data = await client.chainHead();
  const miners = await client.stateListMiners(data.Cids);
  console.log(miners);
  return;

  Way too expensive, will return 595394 storage providers
  */

  for (const sp of storageProviders) {
    await sleep(500);

    await Utilities.runQuery({
      queryFn: async () => {
        const save = await DB.insert({
          created_at: new Date(),
          address: sp.address,
        })
          .into('filecoin_storage_providers')
          .returning('*');
        console.log(save);
      },
      errorFn: () => {
        print({ address: `storage-market-api`, copy: `Could not add ${sp.address}, most likely in DB already ...` });
      },
      label: `WRITE_ADDRESS_${sp.address}_TO_DATABASE`,
    });
  }

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
