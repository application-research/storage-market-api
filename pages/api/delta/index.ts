import * as Server from '@common/server';

import DB from '@common/db';

export default async function APIGlobalDeltaIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select()
    .from('delta_analytics')
    .orderBy('created_at', 'asc')
    .first();

  res.json({ global: response });
}
