import {Service} from 'feathers-objection'

import User from './model'
import hooks from './hooks'

export default function() {
  this.use('users', new Service({model: User}))

  this.service('users').hooks(hooks)
}
