import DB from '../common/db';

const NAME = `create-users-table.js`;

console.log(`RUNNING: ${NAME}`);

const createRun = DB.schema.createTable('users', function(table) {
  table
    .uuid('id')
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw('uuid_generate_v4()'));
  table
    .string('username')
    .unique()
    .nullable();
  table
    .timestamp('created_at')
    .notNullable()
    .defaultTo(db.raw('now()'));
  table
    .timestamp('updated_at')
    .notNullable()
    .defaultTo(db.raw('now()'));
  table.string('password').nullable();
  table.string('salt').nullable();
  table.string('is_subscribed').nullable();
  table.string('is_admin').nullable();
  table.string('avatar_url', 3000).nullable();
  table
    .string('email', 3000)
    .unique()
    .notNullable();
  table.jsonb('links').nullable();
  table.jsonb('data').nullable();
});

async function run() {
  await Promise.all([createRun]);
  console.log(`FINISHED: ${NAME}`);
  process.exit(0);
}

run();
