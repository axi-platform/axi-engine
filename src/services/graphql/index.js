import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import depthLimit from 'graphql-depth-limit'
import errors from '@feathersjs/errors'

import Resolvers from './resolvers'

import Schema from './schema.gql'

// Formats GraphQL errors
function formatError(err) {
  // If the error is a feathers error
  if (err.originalError instanceof errors.FeathersError) {
    return err.originalError.toJSON()
  }

  return err
}

export default function graphql() {
  const app = this

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app),
  })

  function handler(req) {
    const {token, provider} = req.feathers

    return {
      formatError,
      schema: executableSchema,
      context: {token, provider},
      validationRules: [depthLimit(10)],
    }
  }

  app.use('/graphql', graphqlExpress(handler))
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
}
