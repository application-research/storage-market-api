if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import knex from 'knex';
const DB = knex({
  client: 'pg',
  connection: {
    ssl: true,
    port: Number(process.env.DOCUMENT_DATABASE_PORT),
    host: process.env.DOCUMENT_DATABASE_HOST,
    database: process.env.DOCUMENT_DATABASE_NAME,
    user: process.env.DOCUMENT_DATABASE_USERNAME,
    password: process.env.DOCUMENT_DATABASE_PASSWORD,
  },
});

export default DB;
