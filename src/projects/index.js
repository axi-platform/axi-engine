import {Service} from 'feathers-objection'

import Project from './model'

export default function() {
  const projects = new Service({
    model: Project,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('projects', projects)
}
