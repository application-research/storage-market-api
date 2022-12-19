import * as Server from '@common/server';

import DB from '@common/db';

export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select().from('filecoin_storage_providers');

  res.json({ storageProviders: response, count: response.length });
}
