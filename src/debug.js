import secure from './hooks/secure'

class DebugService {
  async find() {
    return {status: 'OK'}
  }

  async create() {
    return {id: 1, data: {name: 'wow'}}
  }
}

export default async function debug() {
  this.use('debug', new DebugService())

  this.service('debug').hooks({
    before: {
      all: [secure],
    },
  })
}
