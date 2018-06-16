import Sequelize from 'sequelize'

import sequelize from './index'

const Device = sequelize.define('device', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  presence: {
    type: Sequelize.ENUM,
    values: ['online', 'offline'],
    defaultValue: 'offline',
  },
})

export default Device
