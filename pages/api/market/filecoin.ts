import * as Server from '@common/server';
import * as Utilities from '@common/utilities';
import * as Filecoin from '@common/filecoin';

import DB from '@common/db';

export default async function APIMarketFilecoin(req, res) {
  await Server.cors(req, res);

  const response = await fetch(`https://cloud.iexapis.com/stable/crypto/filusdt/price?token=${process.env.IEX_CLOUD_PUBLIC_KEY}`);
  const json = await response.json();
  let results = { ...json };

  if (!Utilities.isEmpty(req.query.amount)) {
    results.amount_fil = req.query.amount;
    results.amount_attofil = Filecoin.convertFILtoAttoFIL(Number(req.query.amount));
    results.amount_cents = BigInt(req.query.amount * results.price * 100).toString();
    results.amount_usd = Filecoin.convertCentsToUSD(results.amount_cents);
    return res.json({ ...results });
  }

  if (!Utilities.isEmpty(req.query.attofil)) {
    results.amount_fil = Filecoin.convertAttoFILtoFIL(req.query.attofil);
    results.amount_attofil = req.query.attofil;
    results.amount_cents = results.amount_fil * results.price * 100;
    results.amount_usd = Filecoin.convertCentsToUSD(results.amount_cents);
    return res.json({ ...results });
  }

  return res.json({ ...results });
}
