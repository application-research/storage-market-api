import * as Server from '@common/server';

import DB from '@common/db';

export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select()
    .from('market')
    .whereNotNull(`gb_per_day_cents`)
    .orderBy('gb_per_day_cents', 'asc');

  res.json({ storageProviders: response, count: response.length });
}
