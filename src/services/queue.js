import {send, consume} from '../core/amqp'

export class QueueService {
  async setup(app) {
    this.app = app

    await consume('queuing', this.handleQueue)
  }

  async find() {
    return {status: 'ACTIVE'}
  }

  async create({data}) {
    try {
      const result = await send('queuing', data)

      return {status: 'QUEUED', data, result}
    } catch (error) {
      return {status: 'ERROR', error}
    }
  }

  handleQueue(data) {
    console.log('[> AMQP] Data', data)
  }
}

export default function seating() {
  this.use('queue', new QueueService())

  // this.service('queue').hooks(hooks)
}
