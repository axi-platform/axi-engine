import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import depthLimit from 'graphql-depth-limit'
import errors from '@feathersjs/errors'

import {execute, subscribe} from 'graphql'
import {PubSub} from 'graphql-subscriptions'
import {SubscriptionServer} from 'subscriptions-transport-ws'

import Resolver from './resolvers'

import Schema from './schema.gql'

export const pubsub = new PubSub()

let execSchema = {}

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

  const schema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolver(app),
  })

  const handler = req => ({
    formatError,
    schema,
    context: req.feathers,
    validationRules: [depthLimit(10)],
  })

  execSchema = schema

  app.use('/graphql', graphqlExpress(handler))
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
}

export const runSubscriptionServer = server =>
  new SubscriptionServer(
    {execute, subscribe, schema: execSchema},
    {server, path: '/subscriptions'},
  )
