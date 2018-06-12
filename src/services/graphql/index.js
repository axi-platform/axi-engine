import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import depthLimit from 'graphql-depth-limit'
import errors from '@feathersjs/errors'

import ServiceResolver from '../../core/graph-resolver'

import Schema from './schema.gql'

// Formats GraphQL errors
function formatError(err) {
  // If the error is a feathers error
  if (err.originalError instanceof errors.FeathersError) {
    return err.originalError.toJSON()
  }

  return err
}

function resolver(app) {
  const Seating = app.service('seating')

  return {
    Query: {
      async hello(root, data, context, info) {
        return JSON.stringify(await Seating.find())
      },
    },
  }
}

const config = {
  seating: {
    alias: 'tickets',
    primary: 'seat',
    methods: ['find', 'get', 'create'],
  },
}

export default function graphql() {
  const app = this

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: ServiceResolver(app, config, resolver),
  })

  function handler(req) {
    return {
      formatError,
      schema: executableSchema,
      context: req.feathers,
      validationRules: [depthLimit(10)],
    }
  }

  app.use('/graphql', graphqlExpress(handler))
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
}
