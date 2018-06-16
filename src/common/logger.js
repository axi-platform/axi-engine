import winston from 'winston'
import {loglevel} from 'config'

const logger = winston.createLogger({
  level: loglevel,
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

export default logger
