import SeatingService from './seating'

class HelloService {
  async find(params) {
    return {status: 200, data: 'Hello, World!'}
  }
}

export default async function(app) {
  app.use('/hello', new HelloService())
  app.use('/seating', new SeatingService())
}
