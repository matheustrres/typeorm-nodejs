import config from 'config';
import * as typeorm from 'typeorm';

import { PostgresConfigProps } from '@/config/default';

const postgresConfig: PostgresConfigProps = config.get<
  PostgresConfigProps
>('app.database');

export const AppDataSource = new typeorm.DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: [],
  migrations: []
});
