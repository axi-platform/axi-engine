import Service from '../common/objection'

import Project from './model'

export default function() {
  const projects = new Service({
    Model: Project,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('projects', projects)
}
