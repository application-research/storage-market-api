import * as Server from '@common/server';
import * as Utilities from '@common/utilities';
import * as Query from '@data/query';
import * as Auth from '@data/auth';

export default async function APIUserByUsername(req, res) {
  await Server.cors(req, res);

  const id = req.query.id;
  if (Utilities.isEmpty(id)) {
    return res.json({ error: true, message: 'NO_USERNAME_PROVIDED' });
  }

  const key = Auth.parseAuthKey(req.headers);
  if (Utilities.isEmpty(key)) {
    return res.json({ error: true, message: 'NO_VALID_AUTHENTICATION_KEY' });
  }

  const isAuthenticated = Auth.isAuthenticated({ key });
  if (!isAuthenticated) {
    return res.json({ error: true, message: 'NO_AUTHORIZED_KEY' });
  }

  const user = await Query.selectUserByUsername({ username });
  if (!user) {
    return res.json({ error: true, message: 'NO_USER' });
  }

  // NOTE(jim): Need a safer way to handle this.
  delete user.password;
  delete user.salt;
  delete user.email;

  return res.json({ success: true, user });
}
