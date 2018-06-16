import R from 'ramda'
import pluralize from 'pluralize'

import pubsub from './subscription'

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
  const capEntity = capitalize(entity)

  return {
    find: service,
    get: entity,
    create: `create${capEntity}`,
    remove: `remove${capEntity}`,
    patch: `update${capEntity}`,
    update: `replace${capEntity}`,
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

const out = (result, field) => {
  if (field) {
    return result[field]
  }

  return result
}

function createResolver(app, service, method, options = {}) {
  const {field} = options

  const Service = app.service(service)
  if (!Service) throw new Error(`Service ${service} does not exist.`)

  // Resolver handles resolving GraphQL calls to Feathers services.
  return async function resolver(root, data, context, info) {
    if (method === 'find') {
      const result = await Service.find({...context, query: data})

      console.log('Result is', result)

      return out(result, field)
    }

    if (method === 'get') {
      // If options.primary is set, use it as GET's ID parameter
      if (!data.id && data[options.primary]) {
        data = data[options.primary]
      }

      // If the query has an ID parameter, use them.
      if (data.id) {
        data = data.id
      }
    }

    // Invoke the handler
    const result = await Service[method](data, context)

    return out(result, field)
  }
}

const events = {
  create: 'created',
  remove: 'removed',
  patch: 'patched',
  update: 'updated',
}

function generateEventName(method, entity, options = {}) {
  const event = events[method]
  let name = `${entity}${capitalize(event)}`

  if (options[name]) {
    name = options[name]
  }

  return {event, name}
}

const pprint = data => {
  if (!data) return null

  if (data.toJSON) return data.toJSON()

  return data
}

function createSubscription(app, name, service, event) {
  app.service(service).on(event, ({data}) => {
    console.debug(`[+] ${name} (${service}.${event})`, pprint(data))

    pubsub.publish(name, {[name]: data})
  })

  return {
    subscribe: () => pubsub.asyncIterator(name),
  }
}

// Automatically generate GraphQL resolvers for Feathers services.
function createServiceResolvers(app, config, options = {}) {
  const mappings = createMappings(config)

  let Query = {}
  let Mutation = {}
  let Subscription = {}

  // Generate GraphQL resolvers for the given mapping.
  mappings.forEach(({service, mapping, options}) => {
    const entity = pluralize.singular(options.alias || service)
    console.debug('[+] Mapping', service, '->', mapping)

    Object.entries(mapping).forEach(([method, action]) => {
      const resolver = createResolver(app, service, method, options)

      if (queryMethods.includes(method)) {
        Query[action] = resolver
      }

      if (mutationMethods.includes(method)) {
        Mutation[action] = resolver

        // Only create subscriptions to methods with
        if (options.subscribe) {
          if (Array.isArray(options.subscribe)) {
            if (!options.subscribe.includes(method)) {
              return
            }
          }

          const {event, name} = generateEventName(method, entity, options)

          Subscription[name] = createSubscription(app, name, service, event)
        }
      }
    })
  })

  // If custom resolvers are present, append them to the generated resolver.
  if (options.resolver) {
    const custom = options.resolver(app)

    Query = {...Query, ...custom.Query}
    Mutation = {...Mutation, ...custom.Mutation}
    Subscription = {...Subscription, ...custom.Subscription}
  }

  console.debug('[> Queries]', Query)
  console.debug('[> Mutations]', Mutation)
  console.debug('[> Subscriptions]', Subscription)

  return {Query, Mutation, Subscription}
}

export default createServiceResolvers
