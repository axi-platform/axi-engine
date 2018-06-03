import Sequelize from 'sequelize'

import sequelize from './index'

const Ticket = sequelize.define('ticket', {
  buyer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seat: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isSeat(seat) {
        return true
      },
    },
  },
})

export default Ticket
