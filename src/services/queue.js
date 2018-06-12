import {Processor, send} from '../core/kafka'

export class QueueService {
  async setup(app) {
    this.app = app

    this.processor = new Processor({
      'queuing.ticket.add': this.addTicket,
    })
  }

  async find() {
    return {status: 'ACTIVE'}
  }

  async create({service, data}) {
    try {
      const result = await send(`queue.${service}.add`, data)

      return {status: 'QUEUED', service, data, result}
    } catch (error) {
      return {status: 'ERROR', error}
    }
  }
}

export default function seating() {
  this.use('queue', new QueueService())

  // this.service('queue').hooks(hooks)
}
