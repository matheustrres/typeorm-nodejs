import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667354714315 implements MigrationInterface {
  public name: string = 'Migration1667354714315'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "name" TO "number"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "number"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "number" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "number"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "number" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "number" TO "name"`);
  }
}
