import Validator from 'validatorjs'
import errors from '@feathersjs/errors'
import utils from 'feathers-hooks-common'

// {
//   name: 'required',
//   email: 'required|email',
//   age: 'min:18'
// }

export default function validate(rules, messages) {
  return (hook, next) => {
    // Check if hook is in a valid context
    utils.checkContext(hook, 'before', ['create', 'update', 'patch'])

    // Validate the input using the schema
    const input = utils.getItems(hook)
    const validation = new Validator(input, rules, messages)

    if (validation.fails()) {
      throw new errors.BadRequest('Invalid request format.', {
        errors: validation.errors.all(),
      })
    }

    next(null, hook)
  }
}
