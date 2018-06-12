import logger from '../core/logger'

const Logger = () => async ctx => {
  logger.info(`[>] Hook: ${ctx.type} ${ctx.path}/${ctx.method}`)

  if (ctx.error) {
    logger.error(ctx.error)
  }
}

export default Logger
