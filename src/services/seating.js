import errors from '@feathersjs/errors'

import hooks, {checkSeatAvailability} from '../hooks/seating'
import Ticket from '../models/ticket'
import {Processor, send} from '../core/kafka'

const TICKET_ADD = 'queuing.ticket.add'

export class SeatingService {
  async setup(app) {
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
    await send(TICKET_ADD, {buyer, seat})

    return {status: 'PROCESSING', seat, buyer}
  }

  async addTicket({seat, buyer}) {
    await checkSeatAvailability(seat)
    await Ticket.create({seat, buyer})

    console.log('[+] Seat', seat, 'has been bought by', buyer)
  }
}

export default function seating() {
  this.use('seating', new SeatingService())

  this.service('seating').hooks(hooks)
}
