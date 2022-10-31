import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667245454333 implements MigrationInterface {
  public name: string = 'Migration1667245454333'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "accountType" SET DEFAULT 'student'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "accountType" SET DEFAULT 'default'`);
  }
}
