// prettier-ignore
exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('projects')

  if (!exist) {
    return knex.schema.createTable('projects', t => {
      t.increments('id').primary()
      t.string('name').unique().notNullable()
      t.string('display_name').notNullable()
      t.string('description').notNullable()
      t.string('color').notNullable()
      t.string('icon').notNullable()
      t.timestamps()
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('projects')
}
