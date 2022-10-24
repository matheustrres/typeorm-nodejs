import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1666648629399 implements MigrationInterface {
  public name: string = 'Migration1666648629399'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "videos" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "videos" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "createdAt"`);
  }
}
