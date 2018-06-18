// prettier-ignore
exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('users')

  if (!exist) {
    return knex.schema.createTable('users', t => {
      t.increments('id').primary()
      t.string('email').unique().notNullable()
      t.string('username').unique().notNullable()
      t.string('password').notNullable()
      t.string('permissions').defaultsTo('user:*')
      t.timestamps()
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('users')
}
