import Sequelize from 'sequelize'

import sequelize from './index'

import {checkSeatFormat} from '../hooks/seating'

const Ticket = sequelize.define('ticket', {
  buyer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seat: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {checkSeatFormat},
  },
})

export default Ticket
