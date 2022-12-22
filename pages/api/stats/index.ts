import * as Server from '@common/server';

import DB from '@common/db';

interface RetrievalStatsPost {
  timeStart: Date
  timeEnd: Date
  stats: RetrievalStat[]
}

interface RetrievalStat {
  sp_address: string,
  countSuccess: number,
  countFail: number,
}

// POST /stats
// Parse a list of retrieval stats and add to the database 
export default async function statsIndex(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'POST') {
    res.status(405).send()
    return
  }


  const sps = await DB.select().from('retrieval_stats');
  const body = JSON.parse(req.body) as RetrievalStatsPost

  const toUpdate: RetrievalStat[] = [];

  body.stats.forEach(rs => {
    const existingSpStats = sps.find(sp => sp.sp_address === rs.sp_address)
    if (existingSpStats) {
      existingSpStats.countSuccess += rs.countSuccess;
      existingSpStats.countFail += rs.countFail;
      toUpdate.push(existingSpStats); 
    } else {
      const newSpStats = {
        countSuccess: rs.countSuccess,
        countFail: rs.countFail,
        sp_address: rs.sp_address,
      }
      toUpdate.push(newSpStats)
    }
  })

  const result = await DB.batchInsert("filecoin_storage_providers", toUpdate)

  res.json({ result, count: result.length });
}
