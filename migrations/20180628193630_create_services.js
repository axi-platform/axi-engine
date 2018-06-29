// prettier-ignore
exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('services')

  if (!exist) {
    return knex.schema.createTable('services', t => {
      t.increments('id').primary()
      t.string('name').unique().notNullable()
      t.timestamps()
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('services')
}
