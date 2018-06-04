import errors, {FeathersError} from '@feathersjs/errors'

import Ticket from '../models/ticket'

export class SeatFormatError extends FeathersError {
  constructor(seat) {
    const message =
      `${seat} is an invalid seat format. ` +
      `Seats must be in the valid pattern of alphabet followed by number, ` +
      `such as A3 or C25.`

    super(message, 'InvalidSeatFormat', 400, 'invalid-seat-format', {seat})
  }
}

export async function isSeatAvailable(seat) {
  const ticket = await Ticket.findOne({where: {seat}})

  if (ticket) {
    // prettier-ignore
    throw new errors.Unprocessable(`Seat ${seat} had been taken by ${ticket.buyer}.`)
  }

  return true
}

// Check the seat format
export function isSeat(seat) {
  const SeatPattern = /^\w\d{1,3}$/

  if (!SeatPattern.test(seat)) {
    throw new SeatFormatError(seat)
  }
}

/*
  Validation Hooks
*/

// Check if the required request parameters are filled
export function validateBody({data}) {
  if (!data.seat || !data.buyer) {
    throw new errors.BadRequest('The seat and buyer fields are required.')
  }
}

// Check if the seat format is correct
export const validateSeatFormat = ctx => isSeat(ctx.data.seat)

// Check if the seat is available
export const checkSeatAvailability = async ctx => isSeatAvailable(ctx.data.seat)

export default {
  before: {
    create: [validateBody, validateSeatFormat, checkSeatAvailability],
  },
}
