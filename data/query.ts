export const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = errorFn(e);
  }

  print({ address: `database-query`, copy: label });
  return response;
};

export const insertUser = async ({ password, salt, username, email }) => {
  return await runQuery({
    label: 'INSERT_USER_BY_USERNAME',
    queryFn: async () => {
      const query: any = await DB.insert({
        password,
        salt,
        username,
        email,
        is_subscribed: false,
        is_admin: false,
        links: {},
        data: {},
      })
        .into('users')
        .returning('*');

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: 'INSERT_USER_BY_USERNAME',
        source: e,
      };
    },
  });
};

export const selectUserByUsername = async ({ username }) => {
  return await runQuery({
    label: 'SELECT_USER_BY_USERNAME',
    queryFn: async () => {
      const query = await DB.select('*')
        .from('users')
        .where({ username })
        .first();

      // @ts-ignore
      if (!query || query.error) {
        return null;
      }

      return query;
    },
    errorFn: async (e) => {
      return {
        error: 'SELECT_USER_BY_USERNAME',
        source: e,
      };
    },
  });
};

export const selectUserByEmail = async ({ email }) => {
  return await runQuery({
    label: 'SELECT_USER_BY_EMAIL',
    queryFn: async () => {
      const query = await DB.select('*')
        .from('users')
        .where({ email })
        .first();

      // @ts-ignore
      if (!query || query.error) {
        return null;
      }

      return query;
    },
    errorFn: async (e) => {
      return {
        error: 'SELECT_USER_BY_EMAIL',
        source: e,
      };
    },
  });
};
