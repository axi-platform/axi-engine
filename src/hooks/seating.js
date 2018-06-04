import errors, {FeathersError} from '@feathersjs/errors'

import Ticket from '../models/ticket'

// When the seat's format is invalid
export class SeatFormatError extends FeathersError {
  constructor(seat) {
    const message =
      `${seat} is an invalid seat format. ` +
      `Seats must be in the valid pattern of alphabet followed by number, ` +
      `such as A3 or C25.`

    super(message, 'InvalidSeatFormat', 400, 'invalid-seat-format', {seat})
  }
}

// Check the seat format
export function checkSeatFormat(seat) {
  const SeatPattern = /^\w\d{1,3}$/

  if (!SeatPattern.test(seat)) {
    throw new SeatFormatError(seat)
  }
}

// Determine if a seat is available.
export async function checkSeatAvailability(seat) {
  const ticket = await Ticket.findOne({where: {seat}})

  if (ticket) {
    // prettier-ignore
    throw new errors.Unprocessable(`Seat ${seat} had been taken by ${ticket.buyer}.`)
  }

  return true
}

export default {
  before: {
    async create({data: {seat, buyer}}) {
      // Are the required parameters filled?
      if (!seat || !buyer) {
        throw new errors.BadRequest('The seat and buyer fields are required.')
      }

      // Is this a valid seat format?
      checkSeatFormat(seat)

      // Is this seat available?
      checkSeatAvailability(seat)
    },
  },
}
