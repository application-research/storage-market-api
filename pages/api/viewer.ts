import * as Server from '@common/server';
import * as Utilities from '@common/utilities';
import * as Query from '@data/query';
import * as Auth from '@data/auth';

export default async function APIViewer(req, res) {
  await Server.cors(req, res);

  const key = Auth.parseAuthKey(req.headers);
  if (Utilities.isEmpty(key)) {
    return res.json({ sucess: true, message: 'HEALTH' });
  }

  const isAuthenticated = Auth.getUsernameAndHashFromKey({ key });
  if (!isAuthenticated) {
    return res.json({ error: true, message: 'NO_AUTHORIZED_KEY' });
  }

  const user = await Query.selectUserByUsername({ username: isAuthenticated.username });
  if (!user) {
    return res.json({ error: true, message: 'NO_VIEWER' });
  }

  // NOTE(jim): Need a safer way to handle this.
  delete user.password;
  delete user.salt;

  return res.json({ success: true, isAuthenticated: true, user });
}
