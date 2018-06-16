import {execute, subscribe} from 'graphql'
import {PubSub} from 'graphql-subscriptions'
import {SubscriptionServer} from 'subscriptions-transport-ws'

import {execSchema} from './index'

const pubsub = new PubSub()

export function runSubscriptionServer(server) {
  return new SubscriptionServer(
    {execute, subscribe, schema: execSchema},
    {server, path: '/subscriptions'},
  )
}

export default pubsub
