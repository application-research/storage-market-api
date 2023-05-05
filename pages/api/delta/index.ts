import * as Server from '@common/server';

import DB from '@common/db';

export default async function APIGlobalDeltaIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select().from('delta_analytics').orderBy('created_at', 'desc').first();

  res.json({ global: response });
}
