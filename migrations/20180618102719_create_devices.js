// prettier-ignore
exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('devices')

  if (!exist) {
    return knex.schema.createTable('devices', t => {
      t.increments('id').primary()
      t.string('name').unique().notNullable()
      t.string('display_name').notNullable()
      t.string('password').notNullable()
      t.enum('presence', ['online', 'offline']).defaultTo('offline')
      t.specificType('position', 'geometry(point, 4326)')
      t.timestamps()
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('devices')
}
