import SequelizeService from 'feathers-sequelize'

import Project from '../models/project'

export default function users() {
  const projects = new SequelizeService({
    Model: Project,

    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('projects', projects)
}
