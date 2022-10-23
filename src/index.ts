import { Server } from './shared/infra/http/server';

(async (): Promise<void> => {
  const server: Server = new Server();

  server.initialize();
  server.startServer();
})();