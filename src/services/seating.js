import errors from '@feathersjs/errors'

import Ticket from '../models/ticket'
import {Processor, send} from '../core/kafka'

const TICKET_ADD = 'queuing.ticket.add'

export class SeatingService {
  async setup(app) {
    await Ticket.sync()

    this.app = app
    this.processor = new Processor('queuing.ticket.*')
    this.processor.on(TICKET_ADD, this.addTicket)
  }

  async find() {
    const seats = await Ticket.findAll()

    return {seats}
  }

  async get(seat) {
    const ticket = await Ticket.findOne({where: {seat}})

    if (!ticket) {
      throw new errors.NotFound(`Seat ${seat} is currently empty.`)
    }

    return {status: 'BOOKED', data: ticket}
  }

  async create({seat, buyer}) {
    const ticket = await Ticket.findOne({where: {seat}})

    if (!seat || !buyer) {
      throw new errors.BadRequest('The seat and buyer fields are required.')
    }

    if (ticket) {
      throw new errors.Unprocessable('This seat had been taken.')
    }

    await send(TICKET_ADD, {buyer, seat})

    return {status: 'PROCESSING', seat, buyer}
  }

  async addTicket({seat, buyer}) {
    const ticket = await Ticket.findOne({where: {seat}})

    if (ticket) {
      console.error('[!!] Seat', seat, 'had been taken by', ticket.buyer)
      return
    }

    await Ticket.create({seat, buyer})

    console.log('[+] Seat', seat, 'has been bought by', buyer)
  }
}

export default function seating() {
  this.use('/seating', new SeatingService())
}
