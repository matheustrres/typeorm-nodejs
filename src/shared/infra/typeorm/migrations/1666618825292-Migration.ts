import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1666618825292 implements MigrationInterface {
  public name: string = 'Migration1666618825292'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE 
        "rooms" 
      ADD 
        "description" text`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE 
        "rooms" 
      DROP COLUMN 
        "description"
    `);
  }
}
