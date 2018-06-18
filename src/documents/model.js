import knex, {Model} from '../common/knex'

export default class Document extends Model {
  static tableName = 'documents'

  static jsonSchema = {required: ['name', 'file']}
}

const paperSize = ['A3', 'A4', 'A5']
const paperType = ['glossy', 'matte', 'thin', 'thick']

export async function createSchema() {
  const exist = await knex.schema.hasTable('documents')

  if (!exist) {
    await knex.schema.createTable('documents', t => {
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

createSchema()
