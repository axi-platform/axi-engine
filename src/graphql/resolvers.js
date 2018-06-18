import ServiceResolver from './service-resolver'

// Configuration for the Service Resolver.
const config = {
  projects: {
    methods: ['find', 'get'],
    subscribe: true,
  },
}

export default function(app) {
  return ServiceResolver(app, config)
}
