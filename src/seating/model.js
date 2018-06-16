import Sequelize from 'sequelize'

import sequelize from '../common/sequelize'

import {checkSeatFormat} from './hooks'

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
