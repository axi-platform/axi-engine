import {FeathersError} from '@feathersjs/errors'

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
