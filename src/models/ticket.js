import Sequelize from 'sequelize'

import sequelize from './index'

import {isSeat} from '../hooks/seating'

const Ticket = sequelize.define('ticket', {
  buyer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seat: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isSeat},
  },
})

export default Ticket
