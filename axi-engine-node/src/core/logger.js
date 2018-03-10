import winston, {format} from 'winston'

const {combine, timestamp, printf} = format

const errorFile = new winston.transports.File({
  filename: 'error.log',
  level: 'error',
})

const logFile = new winston.transports.File({
  filename: 'info.log',
})

const consoleFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

const consoleTransport = new winston.transports.Console({
  format: combine(timestamp(), consoleFormat),
  colorize: true,
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [errorFile, logFile],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport)
}

export default logger
