import {Model} from 'objection'

// Custom Base Model for Objection
export default class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}
