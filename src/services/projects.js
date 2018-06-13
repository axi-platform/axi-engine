import SequelizeService from 'feathers-sequelize'

import Project from '../models/project'

export default function users() {
  this.use('projects', new SequelizeService({Model: Project}))
}
