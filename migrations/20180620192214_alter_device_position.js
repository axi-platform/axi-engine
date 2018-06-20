// prettier-ignore
exports.up = async function up(knex) {
  return knex.schema.table('devices', t => {
    t.dropColumn('position')
    t.float('latitude')
    t.float('longitude')
  })
}

exports.down = async function down(knex) {
  // return knex.schema.dropTable('devices')
}
