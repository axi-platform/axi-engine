import redis from 'redis-promisify'

const client = redis.createClient({
  host: 'redis',
  port: 6379,
})

export default client
