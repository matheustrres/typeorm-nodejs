import 'reflect-metadata';

import { Server } from '@/src/shared/infra/http/server';
import { Logger } from '@/src/shared/utils/logger';

const logger: Logger = Logger.it('Bootstrap');

process.on('unhandledRejection', (reason, promise): void => {
  logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
  
  throw reason;
});

process.on('uncaughtException', (error: Error): void => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  
  process.exit(0);
});

(async (): Promise<void> => {
  try {
    const server: Server = new Server();
    await server.initialize();
    
    server.startServer();
  
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  
    exitSignals.forEach(
      (signal: NodeJS.Signals) => {
        process.on(signal, async (): Promise<void> => {
          try {
            await server.stopServer();
      
            logger.info(`App exited with success.`);
            process.exit(1);
          } catch (error) {
            logger.error(`App exited with an error: ${error}`);
            process.exit(0);
          }
        });
      }
    );
  } catch (error) {
    logger.error(`App exited with an error: `, error);
    process.exit(0);
  }
})();