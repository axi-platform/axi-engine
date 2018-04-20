class HelloService {
  async find(params) {
    return {status: 200, data: 'Hello, World!'}
  }
}

class QueuingService {
  async find(params) {
    return {status: 200, message: 'Queuing Service'}
  }
}

export default async function(app) {
  app.use('/hello', new HelloService())
  app.use('/queue', new QueuingService())
}
