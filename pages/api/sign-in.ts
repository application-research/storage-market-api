import * as Server from '@common/server';
import * as Utilities from '@common/utilities';
import * as Query from '@data/query';
import * as Auth from '@data/auth';

import bcrypt from 'bcrypt';

export default async function APISignIn(req, res) {
  await Server.cors(req, res);

  if (Utilities.isEmpty(req.body.email)) {
    return res.json({ error: true, message: 'NO_EMAIL_PROVIDED' });
  }

  if (Utilities.isEmpty(req.body.password)) {
    return res.json({ error: true, message: 'NO_PASSWORD_PROVIDED' });
  }

  const password = Auth.encrypt(req.body.password);

  const user = await Query.selectUserByEmail({ email: req.body.email });
  if (!user) {
    return res.json({ error: true, message: 'NO_USER' });
  }

  const hashed = bcrypt.hashSync(password, user.salt);
  if (user.password !== hashed) {
    return res.json({ error: true, message: 'NO_VALID_USER' });
  }

  let key;
  try {
    key = Auth.generateKeyFromUser(user);
  } catch (e) {
    return res.json({ error: true, message: 'FAILED_TO_AUTHENTICATE' });
  }

  res.json({ success: true, key });
}
