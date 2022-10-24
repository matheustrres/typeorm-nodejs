import { ConfigProps } from './default';

export default {
  app: {
    port: 3000,
    database: {
      host: 'localhost',
      port: process.env.PG_PORT || 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_NAME
    }
  }
} as ConfigProps;