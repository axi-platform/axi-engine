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

export class Processor {
  constructor(topic, onProcess, onError) {
    if (onProcess) this.onProcess = onProcess
    if (onError) this.onError = onProcess

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

  onProcess() {
    console.log('[!] Please override onProcess()')
  }

  onError(error) {
    console.error('[!] Kafka Error:', error)
  }

  onMessage = ({topic, value, ...meta}) => {
    this.onProcess(topic, msgpack.unpack(value), meta)
  }
}
