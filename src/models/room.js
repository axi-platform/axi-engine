import Sequelize from 'sequelize'

import sequelize from './index'

export const Player = sequelize.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: Sequelize.STRING,
})

export const Room = sequelize.define('room', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
})

Room.hasMany(Player, {as: 'players'})
Player.belongsTo(Room, {onDelete: 'cascade'})

Room.beforeValidate(room => {
  room.id = Math.random()
    .toString(36)
    .substring(2, 8)
})
