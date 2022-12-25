if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import knex from 'knex';

const ssl = process.env.DOCUMENT_DATABASE_HOST === '127.0.0.1' ? false : true

const DB = knex({
  client: 'pg',
  connection: {
    ssl: ssl,
    port: Number(process.env.DOCUMENT_DATABASE_PORT),
    host: process.env.DOCUMENT_DATABASE_HOST,
    database: process.env.DOCUMENT_DATABASE_NAME,
    user: process.env.DOCUMENT_DATABASE_USERNAME,
    password: process.env.DOCUMENT_DATABASE_PASSWORD,
  },
});

export default DB;
