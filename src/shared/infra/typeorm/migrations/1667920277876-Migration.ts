import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667920277876 implements MigrationInterface {
  public name: string = 'Migration1667920277876';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."subjects_status_enum"`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "updatedAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "updatedAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "updatedAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-07 23:35:58.281'`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "updatedAt" SET DEFAULT '2022-11-07 23:35:58.247'`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-07 23:35:58.247'`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "updatedAt" SET DEFAULT '2022-11-07 23:35:58.247'`);
    await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "createdAt" SET DEFAULT '2022-11-07 23:35:58.247'`);
    await queryRunner.query(`CREATE TYPE "public"."subjects_status_enum" AS ENUM('closed_enrollments', 'open_enrollments')`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD "status" "public"."subjects_status_enum" NOT NULL DEFAULT 'open_enrollments'`);
  }
}
