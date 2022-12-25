import * as Server from '@common/server';

import DB from '@common/db';

export default async function APIMarketIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select()
    .from('market')
    .whereNotNull(`gb_per_day_cents`)
    .where('gb_per_day_cents', '>=', 0)
    .orderBy('gb_per_day_cents', 'asc')
    .orderByRaw('gb_storage_limit desc NULLS FIRST');

  res.json({ storageProviders: response, count: response.length });
}
