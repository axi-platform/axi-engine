import logger from '../common/logger'

const Logger = () => async ctx => {
  logger.debug(`[>] Hook: ${ctx.type} ${ctx.path}/${ctx.method}`)

  if (ctx.error) {
    logger.error(ctx.error)
  }
}

export default Logger
