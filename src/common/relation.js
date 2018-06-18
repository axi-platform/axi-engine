import {Model} from 'objection'
import pluralize from 'pluralize'

// static relationMappings = {
//   processor: {
//     relation: Model.BelongsToOneRelation,
//     modelClass: Store,
//     join: {
//       from: 'documents.processorId',
//       to: 'processor.id',
//     },
//   },
// }

export default class Relation {
  belongsTo(modelClass) {
    const source = this.tableName
    const table = modelClass.tableName
    const entity = pluralize.singular(table)

    const from = `${source}.${entity}Id`
    const to = `${table}.id`

    return {
      relation: Model.BelongsToOneRelation,
      modelClass,
      join: {from, to},
    }
  }
}
