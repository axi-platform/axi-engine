exports.up = async function up(knex) {
  return knex.schema.table('devices', t => {
    t.integer('service_id').unsigned()
    t.foreign('service_id').references('services.id')
  })
}

exports.down = async function down(knex) {
  return knex.schema.table('devices', t => {
    t.dropColumn('service_id')
  })
}
