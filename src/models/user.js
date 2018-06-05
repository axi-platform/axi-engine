import Sequelize from 'sequelize'

import sequelize from './index'

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'email must be a valid email.',
      },
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
  // comma-separated permissions used in feathers-permissions
  permissions: {
    type: Sequelize.STRING,
  },
})

export default User
