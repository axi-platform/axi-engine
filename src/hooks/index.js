import logger from './logger'

// Application-level Before Hooks
const before = {
  all: [logger()],
}

// Application-level After Hooks
const after = {
  all: [logger()],
}

// Application-level Error Hooks
const error = {
  all: [logger()],
}

export default {before, after, error}
