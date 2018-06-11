import R from 'ramda'
import pluralize from 'pluralize'

const capitalize = text => text.charAt(0).toUpperCase() + text.substr(1)

/*
  generateDefaultMapping('users') => ({
    find: 'users',
    get: 'user',
    create: 'createUser',
    remove: 'removeUser',
    patch: 'updateUser',
    update: 'replaceUser'
  })
*/

function generateDefaultMapping(service) {
  const entity = pluralize.singular(service)
  const capService = capitalize(entity)

  return {
    find: service,
    get: entity,
    create: `create${capService}`,
    remove: `remove${capService}`,
    patch: `update${capService}`,
    update: `replace${capService}`,
  }
}

const queryMethods = ['find', 'get']
const mutationMethods = ['create', 'remove', 'patch', 'update']
const feathersServiceMethods = [...queryMethods, ...mutationMethods]

function generateMapping(name, options = {}) {
  // Use default method names if "options" is true
  if (options === true) {
    return generateDefaultMapping(name)
  }

  // If options is an array of allowed methods
  if (Array.isArray(options)) {
    return R.pick(options, generateDefaultMapping(name))
  }

  const customMethods = R.pick(feathersServiceMethods, options)

  // Disable generation of default mapping.
  if (options.methods === false) {
    return customMethods
  }

  // Mapping is the default mapping overrided by custom methods
  const mapping = {
    ...generateDefaultMapping(options.alias || name),
    ...customMethods,
  }

  // Generate every single method
  if (options.methods === true) {
    return mapping
  }

  // Only allow some methods to be generated
  if (options.methods) {
    return R.pick(options.methods, mapping)
  }

  return mapping
}

function createMappings(config) {
  return Object.entries(config).map(([service, options]) => ({
    service,
    mapping: generateMapping(service, options),
    options: R.omit(feathersServiceMethods, options),
  }))
}

function createHandler(app, service, name, method, options = {}) {
  const {field = 'data'} = options

  const Service = app.service(service)
  if (!Service) throw new Error(`Service ${service} does not exist.`)

  const handle = Service[method].bind(app)

  return async (root, data, context, info) => {
    const params = {...context, provider: 'rest'}

    console.log('[>] Data is', data)
    console.log('[>] Context is', context)

    // If options.primary is set, use it as GET's ID parameter
    if (method === 'get' && !data.id && data[options.primary]) {
      data = data[options.primary]
    }

    // Invoke the handler
    const result = await handle(data, params)
    console.log('[+] Result is', result)

    if (!result) return null
    if (field === false) return result

    return result[field]
  }
}

function createServiceResolver(app, config) {
  const mappings = createMappings(config)

  const Query = {}
  const Mutation = {}

  mappings.forEach(({service, mapping, options}) => {
    console.debug('[+] Mapping', service, '->', mapping)

    Object.entries(mapping).forEach(([method, name]) => {
      const handler = createHandler(app, service, name, method, options)

      if (queryMethods.includes(method)) Query[name] = handler
      if (mutationMethods.includes(method)) Mutation[name] = handler
    })
  })

  return {Query, Mutation}
}

export default createServiceResolver
