import {HighLevelProducer, Consumer, Client} from 'kafka-node'
import msgpack from 'msgpack'

export const client = new Client()

export const producer = new HighLevelProducer(client)

producer.on('ready', () => {
  console.log('[+] Producer is now ready.')
})

producer.on('error', console.error)

export function send(topic, payload) {
  return new Promise((resolve, reject) => {
    const payloads = [{topic, messages: msgpack.pack(payload)}]

    producer.send(payloads, (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

// Load all topics
export function loadTopics() {
  return new Promise((resolve, reject) => {
    client.once('connect', () => {
      client.loadMetadataForTopics([], (err, results) => {
        if (err) return reject(err)

        resolve(Object.keys(results[1].metadata))
      })
    })
  })
}

export const asTopic = topic => ({topic, offset: 0})

// Retrieves a list of topics that matches the pattern
export async function queryTopics(pattern) {
  const topics = await loadTopics()

  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern)
  }

  return topics.filter(x => pattern.test(x)).map(asTopic)
}

// Custom Handler for Patterns
export const PatternHandler = (topic, handlers, callback) => {
  handlers = [...handlers.keys()].filter(x => x[0] instanceof RegExp)

  if (handlers.length > 0) {
    console.log('[>] Pattern Handlers:', handlers)

    handlers
      .filter(x => x[0].test(topic) && x[1])
      .map(handler => handler[1])
      .forEach(callback)
  }
}

export class Processor {
  handlers = new Map()

  constructor(topic) {
    this.setup(topic)
  }

  setup = async topic => {
    const topics = await queryTopics(topic)

    this.consumer = new Consumer(client, topics, {
      autoCommit: true,
      encoding: 'buffer',
    })

    this.consumer.on('message', this.onMessage)
    this.consumer.on('error', this.onError)
    this.consumer.on('offsetOutOfRange', this.onError)
  }

  on = (event, handler) => {
    this.handlers.set(event, handler)
  }

  onError(error) {
    const handle = this.handlers.get('error')

    if (handle) {
      return handle(error)
    }

    console.error('[!] Kafka Error:', error)
  }

  onMessage = ({topic, value, ...meta}) => {
    const payload = msgpack.unpack(value)
    const handle = this.handlers.get(topic)

    console.log('[?] Event:', topic, '=>', payload)

    if (handle) handle(payload, meta)

    // PatternHandler(topic, this.handlers, h => h(payload, meta))
  }
}
