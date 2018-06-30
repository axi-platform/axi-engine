import Service from '../common/objection'

import User from './model'
import hooks from './hooks'

export default function() {
  this.use('users', new Service({Model: User}))

  this.service('users').hooks(hooks)
}
