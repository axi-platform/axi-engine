const paperSize = ['A3', 'A4', 'A5']
const paperType = ['glossy', 'matte', 'thin', 'thick']

exports.up = async function up(knex) {
  const exist = await knex.schema.hasTable('documents')

  if (!exist) {
    return knex.schema.createTable('documents', t => {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('file').notNullable()

      t.boolean('colored').defaultsTo(true)
      t.boolean('borderless').defaultTo(false)
      t.boolean('high_quality').defaultTo(false)

      t.enum('paper_size', paperSize).defaultTo('A4')
      t.enum('paper_type', paperType).defaultTo('thick')
      t.timestamps()
    })
  }
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('documents')
}
