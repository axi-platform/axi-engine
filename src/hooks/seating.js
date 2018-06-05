import auth from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'
import errors, {FeathersError} from '@feathersjs/errors'

import validate from './validate'

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
const SeatPattern = /^\w\d{1,3}$/

export function checkSeatFormat(seat) {
  if (!SeatPattern.test(seat)) {
    throw new SeatFormatError(seat)
  }

  return true
}

// Check if the seat is currently available.
export async function checkSeatAvailability(seat) {
  const ticket = await Ticket.findOne({where: {seat}})

  if (ticket) {
    // prettier-ignore
    throw new errors.Unprocessable(`Seat ${seat} had been taken by ${ticket.buyer}.`)
  }
}

const preventDuplicateSeat = async ctx => checkSeatAvailability(ctx.data.seat)

// Input validation hooks
const validateInput = validate({
  seat: {
    type: 'custom',
    check: checkSeatFormat,
  },
  buyer: 'string',
})

export default {
  before: {
    create: [
      auth.hooks.authenticate(['jwt', 'local']),
      checkPermissions({roles: ['admin']}),
      validateInput,
      preventDuplicateSeat,
    ],
    update: [validateInput],
    patch: [validateInput],
  },
}
