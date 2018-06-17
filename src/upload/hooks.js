import {BadRequest} from 'feathers-errors'

import {fileToURI} from './util'

async function generateURI(ctx) {
  if (!ctx.data.uri) {
    const file = ctx.params.file || ctx.data.file

    if (!file) {
      throw new BadRequest('File must be supplied through the uri parameter.')
    }

    ctx.data = {uri: await fileToURI(file)}
  }
}

export default {
  before: {
    create: [generateURI],
  },
}
