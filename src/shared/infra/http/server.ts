import http from 'node:http';
import express from 'express';
import config from 'config';
import cors from 'cors';

import { Server as OvernightServer } from '@overnightjs/core';

const appPort: number = config.get<
  number
>('app.port');

export class Server extends OvernightServer {
  private server?: http.Server;

  constructor(private port: number = appPort) {
    super();
  }

  public initialize(): void {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(express.json())
    this.app.use(
      cors({
        origin: '*'
      })
    );
    this.app.use(
      express.urlencoded({
        extended: true
      })
    );
  }

  public async stopServer(): Promise<void> {
    if (this.server) {
      await new Promise(
        (resolve, reject): void => {
          this.server?.close(
            (err: Error): void => {
              if (err) {
                return reject(err);
              }

              resolve(true);
            }
          );
        }
      );
    }
  }

  public startServer(): void {
    this.server = this.app.listen(this.port, (): void => {
      console.info(
        'Server successfully listening on port ' + this.port
      );
    });
  } 
}