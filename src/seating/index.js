import errors from '@feathersjs/errors'

import hooks, {checkSeatAvailability} from './hooks'
import Ticket from './model'

export class SeatingService {
  async setup(app) {
    this.app = app
  }

  async find() {
    const seats = await Ticket.findAll()

    return {data: seats}
  }

  async get(seat) {
    const ticket = await Ticket.findOne({where: {seat}})

    if (!ticket) {
      throw new errors.NotFound(`Seat ${seat} is currently empty.`)
    }

    return {id: seat, data: ticket, status: 'BOOKED'}
  }

  async create({seat, buyer}) {
    await checkSeatAvailability(seat)
    const ticket = await Ticket.create({seat, buyer})

    return {id: ticket.id, data: ticket}
  }
}

export default function seating() {
  this.use('seating', new SeatingService())

  this.service('seating').hooks(hooks)
}
