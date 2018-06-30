import Service from '../common/objection'

import Document from './model'

export default async function() {
  this.use('documents', new Service({Model: Document}))
}
