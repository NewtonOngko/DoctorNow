const { env } = process;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'remotemysql.com',
    user: env.DB_USER || 'gbSm65qWO0',
    password: env.DB_PASSWORD || 'hI0rR4Y4vJ',
    database: env.DB_NAME || 'gbSm65qWO0',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
