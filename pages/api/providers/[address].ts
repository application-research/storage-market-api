import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import DB from '@common/db';

export default async function apiGetStorageProvider(req, res) {
  await Server.cors(req, res);

  const { address } = req.query;

  if (Utilities.isEmpty(address)) {
    return res.json({ error: `no address was specified.` });
  }

  const response = await DB.select().from('filecoin_storage_providers').where({ address });

  res.json({ ...response });
}
