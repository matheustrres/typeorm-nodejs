interface DefaultConfigProps {
  host: string;
  port: number;
  password: string;
}

export interface RedisConfigProps extends DefaultConfigProps {}

export interface PostgresConfigProps extends DefaultConfigProps {
  username: string;
  database: string;
}

export interface AppConfigProps {
  app: {
    port: number;
    database: PostgresConfigProps;
    auth: {
      key: string;
      tokenExpiresIn: string;
    };
    resources: {
      redis: RedisConfigProps
    }
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
    },
    auth: {
      key: process.env.MD5_HASH_KEY,
      tokenExpiresIn: '1d'
    },
    resources: {
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS
      }
    }
  }
} as AppConfigProps;