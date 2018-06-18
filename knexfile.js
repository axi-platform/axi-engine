const development = {
  client: 'postgresql',
  connection: {
    database: 'axi',
    user: 'postgres',
    password: 'password',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}

// TODO: Configure Migrations for Production
module.exports = {
  development,
  staging: development,
  production: development,
}
