import ServiceResolver from '../../core/graph-resolver'

// Configuration for the Service Resolver.
const config = {
  projects: {
    methods: ['find', 'get'],
    subscribe: true,
  },
}

// Custom Resolvers for when you need it.
function resolver(app) {
  return {}
}

export default function(app) {
  return ServiceResolver(app, config, {resolver})
}
