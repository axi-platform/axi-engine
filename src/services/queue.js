import {send, consume} from '../core/queue'

export class QueueService {
  async setup(app) {
    this.app = app

    await consume('queue', 'axi.#', this.handleAxiQueue)
    await consume('queue', 'logging.#', this.handleLogging)
    await consume('amq.topic', '#', this.handleDevice)
  }

  async find() {
    return {status: 'ACTIVE'}
  }

  async create({service, data}) {
    try {
      const result = await send('queue', service, data)

      return {status: 'QUEUED', data, result}
    } catch (error) {
      return {status: 'ERROR', error}
    }
  }

  handleAxiQueue(data, key) {
    console.log('[> Axi Queue]', key, data)
  }

  handleLogging(data, key) {
    console.log('[> Processed]', key, data)
  }

  handleDevice(data, key) {
    console.log('[> Device]', key, data)
  }
}

export default function seating() {
  this.use('queue', new QueueService())

  // this.service('queue').hooks(hooks)
}
