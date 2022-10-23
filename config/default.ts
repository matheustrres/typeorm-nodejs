export interface PostgresConfigProps {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ConfigProps {
  app: {
    port: number;
    database: PostgresConfigProps;
  }
}

export default {
  app: {
    port: 3000,
    database: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT || 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_NAME
    }
  }
} as ConfigProps;