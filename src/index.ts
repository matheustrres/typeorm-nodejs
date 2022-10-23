import 'reflect-metadata';

import { Server } from '@/src/shared/infra/http/server';
import { AppDataSource } from '@/src/shared/infra/typeorm/data-source';

(async (): Promise<void> => {
  AppDataSource.initialize()
    .then(
      (): void => {
        const server: Server = new Server();

        server.initialize();
        server.startServer();
      }
    );
})();