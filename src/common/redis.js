import redis from 'redis-promisify'

import {redis as url} from 'config'

const client = redis.createClient({url})

export default client
