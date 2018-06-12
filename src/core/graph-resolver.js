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
  const defaultMapping = generateDefaultMapping(options.alias || name)

  // Use default method names if "options" is true
  if (options === true) {
    return defaultMapping
  }

  // If options is an array of allowed methods
  if (Array.isArray(options)) {
    return R.pick(options, defaultMapping)
  }

  const customMethods = R.pick(feathersServiceMethods, options)

  // Disable generation of default mapping.
  if (!options.methods) {
    return customMethods
  }

  // Mapping is the default mapping overrided by custom methods
  const mapping = {...defaultMapping, ...customMethods}

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

function createHandler(app, service, method, options = {}) {
  const {field = 'data'} = options

  const Service = app.service(service)
  if (!Service) throw new Error(`Service ${service} does not exist.`)

  const handle = Service[method].bind(app)

  return async (root, data, context, info) => {
    data.user = context.user
    data.provider = context.provider
    context.path = service
    context.service = service

    console.log('[>] Data is', data)
    console.log('[>] Context is', context)

    if (method === 'get') {
      // If options.primary is set, use it as GET's ID parameter
      if (!data.id && data[options.primary]) {
        data = data[options.primary]
      }

      if (data.id) data = data.id
    }

    if (method === 'find') {
      data = {query: data}
    }

    // Invoke the handler
    const result = await handle(data, context)
    // console.log('[+] Result is', result)

    if (!result) return null
    if (field === false) return result

    return result[field]
  }
}

function createServiceResolver(app, config, customResolver) {
  const mappings = createMappings(config)

  let Query = {}
  let Mutation = {}

  // Generate GraphQL resolvers for the given mapping.
  mappings.forEach(({service, mapping, options}) => {
    console.debug('[+] Mapping', service, '->', mapping)

    Object.entries(mapping).forEach(([method, name]) => {
      const handler = createHandler(app, service, method, options)

      if (queryMethods.includes(method)) Query[name] = handler
      if (mutationMethods.includes(method)) Mutation[name] = handler
    })
  })

  // If custom resolvers are present, append them to the generated resolver.
  if (customResolver) {
    const custom = customResolver(app)

    Query = {...Query, ...custom.Query}
    Mutation = {...Mutation, ...custom.Mutation}
  }

  console.log('[Q]', Query)
  console.log('[M]', Mutation)

  return {Query, Mutation}
}

export default createServiceResolver
