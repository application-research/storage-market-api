import * as Server from '@common/server';

import DB from '@common/db';

interface RetrievalStatsPost {
  timeStart: Date
  timeEnd: Date
  stats: RetrievalStat[]
}

interface RetrievalStat {
  address: string, // SP address
  peerId: string, // SP peerid
  countSuccess: number,
  countFail: number,
}

// POST /push
// Parse a list of retrieval stats and add to the database 
export default async function pushIndex(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'POST') {
    res.status(405).send()
    return
  }

  const body = JSON.parse(req.body) as RetrievalStatsPost

  // await DB.batchInsert("filecoin_storage_providers", body)


  // const response = await DB.select().from('filecoin_storage_providers').whereNotNull(`raw_power_bytes`);

  // res.json({ storageProviders: response, count: response.length });
}
