import Joi from 'joi'
import Errors from '@feathersjs/errors'
import utils from 'feathers-hooks-common'
import errorsForForms from 'joi-errors-for-forms'

export default function validate(schema, options, translations) {
  const translator = errorsForForms.form(translations)

  return (hook, next) => {
    // Check if hook is in a valid context
    utils.checkContext(hook, 'before', ['create', 'update', 'patch'])

    const input = utils.getItems(hook)

    Joi.validate(input, schema, options, (error, converted) => {
      const errors = translator(error)

      if (errors) {
        throw new Errors.BadRequest('Invalid request format.', {errors})
      }

      if (options.convert) {
        utils.replaceItems(hook, converted)
      }

      next(null, hook)
    })
  }
}
