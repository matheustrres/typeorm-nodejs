import http from 'node:http';
import express from 'express';
import config from 'config';
import cors from 'cors';

import { AppDataSource } from '../typeorm/data-source';

import { Server as OvernightServer } from '@overnightjs/core';

import { ProfileController } from './controllers/profile.controller';
import { RoomController } from './controllers/room.controller';
import { StudentController } from '@/src/shared/infra/http/controllers/student.controller';
import { SubjectController } from './controllers/subject.controller';

import { ProfileService } from '@/src/services/profile.service';
import { RoomService } from '@/src/services/room.service';
import { StudentService } from '@/src/services/student.service';
import { SubjectService } from '@/src/services/subject.service';

import { Logger } from '@/src/shared/utils/logger';

const appPort: number = config.get<
  number
>('app.port');

/**
 * Represents the main Server
 */
export class Server extends OvernightServer {
  private server?: http.Server;
  private logger: Logger
  
  /**
   * Creates a new Server instance
   *
   * @param {Number} [port] - The port to be listened by the server
   */
  constructor(private port: number = appPort) {
    super();
    
    this.logger = Logger.it(this.constructor.name);
  }
  
  /**
   * Initializes the server, doing all the necessary setups
   *
   * @returns {Promise<void>}
   */
  public async initialize(): Promise<void> {
    this.setupExpress();
    this.setupControllers();

    await this.setupDatabase();
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

  private setupControllers(): void {
    const profileService = new ProfileService();
    const roomService = new RoomService();
    const studentService = new StudentService();
    const subjectService = new SubjectService();
    
    const profileController = new ProfileController(profileService);
    const roomController = new RoomController(roomService);
    const studentController = new StudentController(studentService);
    const subjectController = new SubjectController(subjectService);
    
    this.addControllers([
      profileController,
      roomController,
      studentController,
      subjectController
    ]);
  }

  private async setupDatabase(): Promise<void> {
    await AppDataSource.initialize();
  }
  
  /**
   * Stops the server, including database connection, at any shutdown signal
   *
   * @returns {Promise<void>}
   */
  public async stopServer(): Promise<void> {
    await AppDataSource.destroy();
    
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
  
  /**
   * Launches the server listening to its given port
   *
   * @returns {void}
   */
  public startServer(): void {
    this.server = this.app.listen(this.port, (): void => {
      this.logger.info(
        'Successfully listening on port ' + this.port
      );
    });
  } 
}