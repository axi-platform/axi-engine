import Redis from 'ioredis'

import {redis as url} from 'config'

const redis = new Redis(url)

export default redis
