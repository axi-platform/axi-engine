import dauria from 'dauria'
import {BadRequest} from '@feathersjs/errors'

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

async function parseURI(ctx) {
  const {buffer, text, mediaType} = dauria.parseDataURI(ctx.result.uri)
  ctx.result = text || buffer
  ctx.mediaType = mediaType

  return ctx
}

export default {
  before: {
    create: [generateURI],
  },
  after: {
    get: [parseURI],
  },
}
