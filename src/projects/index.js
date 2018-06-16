import SequelizeService from 'feathers-sequelize'

import Model from './model'

export default function users() {
  const projects = new SequelizeService({
    Model,

    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('projects', projects)
}
