import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1668104933906 implements MigrationInterface {
  public name: string = 'Migration1668104933906';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "rooms_specifications" ("room_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_e638ac86805dce620fbae9e73fd" PRIMARY KEY ("room_id", "specification_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_e08571b7cf41d2be871cb905bc" ON "rooms_specifications" ("room_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_ee8d4248c99ab69b502a0ab6bc" ON "rooms_specifications" ("specification_id") `);
    await queryRunner.query(`ALTER TABLE "rooms_specifications" ADD CONSTRAINT "FK_e08571b7cf41d2be871cb905bcd" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "rooms_specifications" ADD CONSTRAINT "FK_ee8d4248c99ab69b502a0ab6bcc" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms_specifications" DROP CONSTRAINT "FK_ee8d4248c99ab69b502a0ab6bcc"`);
    await queryRunner.query(`ALTER TABLE "rooms_specifications" DROP CONSTRAINT "FK_e08571b7cf41d2be871cb905bcd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ee8d4248c99ab69b502a0ab6bc"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e08571b7cf41d2be871cb905bc"`);
    await queryRunner.query(`DROP TABLE "rooms_specifications"`);
  }
}
