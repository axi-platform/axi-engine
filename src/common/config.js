export const {
  // Application Port
  PORT = 3030,

  // Authentication Secret
  SECRET,

  // Log Level for Winston
  LOG_LEVEL = 'info',

  // Pagination Configuration
  PAGINATE_DEFAULT = 10,
  PAGINATE_MAX = 50,

  // Database Configuration for Knex
  DATABASE = 'axi',
  DB_HOST = 'postgresql',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASSWORD,

  // Connection Strings for RabbitMQ (AMQP)
  RABBITMQ_URL = 'amqp://rabbitmq',

  // Connection Strings for Redis
  REDIS_URL = 'redis://redis',
} = process.env

// Pagination Configuration
export const paginate = {
  default: PAGINATE_DEFAULT,
  max: PAGINATE_MAX,
}

// Database Configuration for Knex
export const database = {
  database: DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
}
