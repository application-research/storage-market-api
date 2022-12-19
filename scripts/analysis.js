import DB from '../common/db';

import * as Utilities from '../common/utilities';
import * as Lotus from '../common/lotus';

const NAME = `analysis.js`;

console.log(`RUNNING: ${NAME}`);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function print({ address, copy }) {
  console.log(`\x1b[1m\x1b[37m\[${address}\]\x1b[0m : ${copy}`);
}

async function run() {
  const client = Lotus.getClient();
  const data = await client.chainHead();

  const response = await DB.select().from('filecoin_storage_providers');
  if (response.length < 1) {
    console.log('There are no storage providers...');
    console.log(`FINISHED: ${NAME}`);
    process.exit(0);
    return;
  }

  for (const sp of response) {
    await sleep(100);
    const info = await client.stateMinerInfo(sp.address, data.Cids);
    print({ address: sp.address, copy: `got info` });
    await sleep(100);
    const power = await client.stateMinerPower(sp.address, data.Cids);
    print({ address: sp.address, copy: `got power` });
    await sleep(100);
    const state = await client.stateReadState(sp.address, data.Cids);
    print({ address: sp.address, copy: `got state` });

    await sleep(100);
    const queryResponse = await fetch(`https://api.estuary.tech/public/miners/storage/query/${sp.address}`);
    const estuary_ask = await queryResponse.json();
    if (!estuary_ask || estuary_ask.error) {
      print({ address: sp.address, copy: `skipping update, not used` });
      continue;
    }

    await sleep(100);
    const statsResponse = await fetch(`https://api.estuary.tech/public/miners/stats/${sp.address}`);
    const estuary_stats = await statsResponse.json();
    if (!estuary_stats || !estuary_stats.usedByEstuary) {
      print({ address: sp.address, copy: `skipping update, not used` });
      continue;
    }

    print({ address: sp.address, copy: `attempting to update` });

    const update = {
      // Chain.Love
      updated_at: new Date(),
      address: sp.address,
      tipset: { cids: data.Cids },
      height: data.Height,
      peer_id: info.PeerId,
      address_of_owner: info.Owner,
      address_of_worker: info.Worker,
      address_of_beneficiary: info.Beneficiary,
      address_of_controllers: { addresses: info.ControlAddresses },
      sector_size_bytes: info.SectorSize,
      raw_power_bytes: power.MinerPower.RawBytePower,
      quality_adjusted_power_bytes: power.MinerPower.QualityAdjPower,
      total_raw_power_bytes: power.TotalPower.RawBytePower,
      total_quality_adjusted_power_bytes: power.TotalPower.QualityAdjPower,
      total_sectors_sealed_by_post_count: info.WindowPoStPartitionSectors,
      balance_attofil: state.Balance,
      locked_funds_attofil: state.State.InitialPledge,
      initial_pledge_attofil: state.State.LockedFunds,

      // Estuary.Stats
      multiaddrs: { addresses: estuary_stats.chainInfo.addresses },
      total_storage_deal_count: estuary_stats.dealCount,
      lotus_version: estuary_stats.version,
      price_attofil: estuary_ask.price,
      price_verified_attofil: estuary_ask.verifiedPrice,
      min_piece_size_bytes: estuary_ask.minPieceSize,
      max_piece_size_bytes: estuary_ask.maxPieceSize,
    };
    console.log(update);

    await Utilities.runQuery({
      queryFn: async () => {
        const result = await DB.from('filecoin_storage_providers').where('id', sp.id).update(update);
      },
      errorFn: (e) => {
        print({ address: sp.address, copy: `error` });
        console.log(e);
      },
      label: `UPDATE_ADDRESS_${sp.address}_TO_DATABASE`,
    });
  }

  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
