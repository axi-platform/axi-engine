import errors from '@feathersjs/errors'

import {SeatFormatError} from './errors'

import Ticket from './model'

import validate from '../hooks/validate'
import authorize from '../hooks/authorize'

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
    get: [authorize('admin', 'user')],
    create: [authorize('admin'), validateInput, preventDuplicateSeat],
    update: [validateInput],
    patch: [validateInput],
  },
}
