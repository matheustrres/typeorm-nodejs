import 'reflect-metadata';

import { Server } from '@/src/shared/infra/http/server';

(async (): Promise<void> => {
  const server: Server = new Server();
  await server.initialize();

  server.startServer();
})();