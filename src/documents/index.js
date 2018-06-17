import {Service} from 'feathers-objection'

import Document from './model'

export default async function() {
  this.use('documents', new Service({model: Document}))
}
