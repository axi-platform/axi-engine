import Sequelize from 'sequelize'
import path from 'path'

const sequelize = new Sequelize('sequelize', '', '', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../storage/db.sqlite'),
  logging: false,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

export default sequelize
