import * as Server from '@common/server';

export default async function APISignIn(req, res) {
  await Server.cors(req, res);

  res.json({ success: true });
}
