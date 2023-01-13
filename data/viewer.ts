import * as Query from '@data/query';

export async function verifyAndGetUser(auth) {
  const user = await Query.selectUserByUsername({ username: auth.username });
  if (!user) {
    return null;
  }

  if (user.password !== auth.password) {
    return null;
  }

  return user;
}
