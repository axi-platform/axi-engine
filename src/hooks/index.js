import logger from './logger'

const before = {
  all: [logger()],
}

const after = {
  all: [logger()],
}

const error = {
  all: [logger()],
}

export default {before, after, error}
