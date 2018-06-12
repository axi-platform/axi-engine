import ServiceResolver from '../../core/graph-resolver'

// Configuration for the Service Resolver.
const config = {
  seating: {
    alias: 'tickets',
    primary: 'seat',
    methods: ['find', 'get', 'create'],
    subscribe: true,
  },
}

// Custom Resolvers for when you need it.
function resolver(app) {
  return {
    Query: {
      async hello(root, data, context, info) {
        return 'Hello, World!'
      },
    },
  }
}

export default function(app) {
  return ServiceResolver(app, config, {resolver})
}
