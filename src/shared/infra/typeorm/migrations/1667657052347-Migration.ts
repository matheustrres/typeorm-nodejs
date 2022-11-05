import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667657052347 implements MigrationInterface {
  public name: string = 'Migration1667657052347';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2022-11-05T14:04:14.197Z"'`);
    await queryRunner.query(`ALTER TABLE "profiles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2022-11-05T14:04:14.197Z"'`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-05T14:04:14.194Z"'`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-11-05T14:04:14.194Z"'`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-05T14:04:14.195Z"'`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-11-05T14:04:14.195Z"'`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-05T14:04:14.196Z"'`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-11-05T14:04:14.196Z"'`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "createdAt" SET DEFAULT '"2022-11-05T14:04:14.196Z"'`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-11-05T14:04:14.196Z"'`);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "createdAt"`);
  }
}
