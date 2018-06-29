const status = ['idle', 'processing', 'completed', 'canceled']

// prettier-ignore
exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('queues')

  if (!exist) {
    return knex.schema.createTable('queues', t => {
      t.increments('id').primary()
      t.integer('device_id').unsigned()
      t.enum('status', status).defaultTo('idle')
      t.jsonb('data')
      t.timestamps()

      t.foreign('device_id').references('devices.id')
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('queues')
}
