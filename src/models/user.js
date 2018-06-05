import Sequelize from 'sequelize'

import sequelize from './index'

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {checkPasswordStrength},
  },
  role: {
    type: Sequelize.STRING,
  },
})

export default User
