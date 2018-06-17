import Sequelize from 'sequelize'

import sequelize from '../common/sequelize'

const Device = sequelize.define('device', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
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
  position: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: true,
  },
})

export default Device
