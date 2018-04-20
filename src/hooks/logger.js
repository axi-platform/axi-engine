import winston from 'winston'
import {loglevel} from 'config'

const logger = winston.createLogger({
  level: loglevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

const Logger = () => async ctx => {
  logger.debug(`${ctx.type} ${ctx.path}/${ctx.method}`)

  if (typeof ctx.toJSON === 'function') {
    logger.debug('Hook Context', JSON.stringify(ctx, null, '  '))
  }

  if (ctx.error) {
    logger.error(ctx.error)
  }
}

export default Logger
