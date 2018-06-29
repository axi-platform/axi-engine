import {send, consume} from '../common/rabbit'

export class MessageQueueService {
  async setup(app) {
    this.app = app

    await consume('queue', 'axi.#', this.handleAxiQueue)
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

  handleDevice(data, key) {
    console.log('[> Device]', key, data)
  }
}

export default function seating() {
  this.use('mqueue', new MessageQueueService())
}
