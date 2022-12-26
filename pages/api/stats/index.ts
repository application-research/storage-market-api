import * as Server from '@common/server';

import DB from '@common/db';

interface RetrievalStatsPost {
  time_start: Date
  time_end: Date
  stats: RetrievalStat[]
}

interface RetrievalStat {
  sp_address: string,
  count_success: number,
  count_fail: number,
}

// POST /stats
// Parse a list of retrieval stats and add to the database 
export default async function statsIndex(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'POST') {
    res.status(405).send()
    return
  }

  console.log(req.body)

  const body = req.body as RetrievalStatsPost
  const sps = await DB.select().from('retrieval_stats');

  const toUpdate: RetrievalStat[] = [];

  body.stats.forEach(rs => {
    // Don't insert junk/missing data
    if (rs.count_fail == undefined || rs.count_success == undefined) {
      return
    }

    const existingSpStats = sps.find(sp => sp.sp_address === rs.sp_address)
    if (existingSpStats) {
      existingSpStats.count_success += rs.count_success;
      existingSpStats.count_fail += rs.count_fail;
      toUpdate.push(existingSpStats); 
    } else {
      const newSpStats = {
        count_success: rs.count_success,
        count_fail: rs.count_fail,
        sp_address: rs.sp_address,
      }
      toUpdate.push(newSpStats)
    }
  })

  if (toUpdate.length < 1) {
    return res.json({count: 0})
  }


  const result = await DB.table("retrieval_stats").insert(toUpdate).onConflict("sp_address").merge().returning("*")

  res.json({ count: result.length });
}
