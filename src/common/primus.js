import Primus from '@feathersjs/primus'

function handler(primus) {
  primus.use('feathers-referrer', (req, res) => {
    // Exposing a request property to services and hooks
    req.feathers.referrer = req.referrer
  })
}

const config = {
  transformer: 'uws',
}

const primus = Primus(config, handler)

export default primus
