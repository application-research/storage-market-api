import * as Server from '@common/server';

import DB from '@common/db';

export default async function APIIndex(req, res) {
  await Server.cors(req, res);

  const response = await DB.select()
    .from('filecoin_storage_providers')
    .whereNotNull(`raw_power_bytes`)
    .limit(8);

  return res.json({ storageProviders: response });
}
