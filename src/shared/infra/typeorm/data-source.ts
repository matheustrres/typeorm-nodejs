import config from 'config';
import * as typeorm from 'typeorm';

import { PostgresConfigProps } from '@/config/default';

const postgresConfig: PostgresConfigProps = config.get<
  PostgresConfigProps
>('app.database');

export const AppDataSource = new typeorm.DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    'src/shared/infra/typeorm/entities/*.entity{.ts,.js}'
  ],
  migrations: [
    'src/shared/infra/typeorm/migrations/*.ts'
  ]
});
