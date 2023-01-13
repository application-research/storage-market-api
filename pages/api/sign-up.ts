import * as Server from '@common/server';
import * as Utilities from '@common/utilities';
import * as Query from '@data/query';
import * as Auth from '@data/auth';

import bcrypt from 'bcrypt';

export default async function APISignUp(req, res) {
  await Server.cors(req, res);

  if (Utilities.isEmpty(req.body.email)) {
    return res.json({ error: true, message: 'NO_EMAIL_PROVIDED' });
  }

  if (Utilities.isEmpty(req.body.password)) {
    return res.json({ error: true, message: 'NO_PASSWORD_PROVIDED' });
  }

  const password = Auth.encrypt(req.body.password);

  if (Utilities.isEmpty(req.body.username)) {
    return res.json({ error: true, message: 'NO_USERNAME_PROVIDED' });
  }

  const existingUser = await Query.selectUserByUsername({ username: req.body.username });
  if (existingUser) {
    if (existingUser.email === req.body.email) {
      return res.json({ error: true, message: 'EMAIL_TAKEN' });
    }

    if (existingUser.username === req.body.username) {
      return res.json({ error: true, message: 'USERNAME_TAKEN' });
    }

    return res.json({ error: true, message: 'SIGN_UP_INVALID' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await Query.insertUser({ username, password: hash, email, salt });
  if (!user || user.error) {
    return res.json({ error: true, message: 'SIGN_UP_INVALID' });
  }

  delete user.email;
  delete user.password;
  delete user.salt;

  res.json({ success: true, user });
}
