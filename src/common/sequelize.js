import Sequelize from 'sequelize'
import {database} from 'config'

const sequelize = new Sequelize({
  ...database,
  dialect: 'postgres',
  logging: false,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

export default sequelize
