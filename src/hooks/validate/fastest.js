import Validator from 'fastest-validator'
import errors from '@feathersjs/errors'
import utils from 'feathers-hooks-common'

// {
//   status: 'boolean',
//   id: {
//     type: 'number',
//     positive: true,
//     integer: true,
//   },
//   name: {
//     type: 'string',
//     min: 3,
//     max: 255,
//   }
// }

export default function validate(schema, messages = {}) {
  const validator = new Validator({messages})
  const check = validator.compile(schema)

  return (hook, next) => {
    // Check if hook is in a valid context
    utils.checkContext(hook, 'before', ['create', 'update', 'patch'])

    // Validate the input using the schema
    const input = utils.getItems(hook)
    const results = check(input)

    if (Array.isArray(results)) {
      throw new errors.BadRequest('Invalid request format.', {errors: results})
    }

    next(null, hook)
  }
}
