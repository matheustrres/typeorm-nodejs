import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667613112632 implements MigrationInterface {
  public name: string = 'Migration1667613112632';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "description" TO "capacity"`);
    await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "room_specifications" ("room_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_4c3dfb29c675bcb80e22c00da23" PRIMARY KEY ("room_id", "specification_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_19212a4f306551d2961cdf93ae" ON "room_specifications" ("room_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_55bb533d191aeef9df6c0ca117" ON "room_specifications" ("specification_id") `);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "capacity"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "capacity" integer NOT NULL DEFAULT '40'`);
    await queryRunner.query(`ALTER TABLE "room_specifications" ADD CONSTRAINT "FK_19212a4f306551d2961cdf93ae1" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "room_specifications" ADD CONSTRAINT "FK_55bb533d191aeef9df6c0ca1172" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room_specifications" DROP CONSTRAINT "FK_55bb533d191aeef9df6c0ca1172"`);
    await queryRunner.query(`ALTER TABLE "room_specifications" DROP CONSTRAINT "FK_19212a4f306551d2961cdf93ae1"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "capacity"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "capacity" text`);
    await queryRunner.query(`DROP INDEX "public"."IDX_55bb533d191aeef9df6c0ca117"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_19212a4f306551d2961cdf93ae"`);
    await queryRunner.query(`DROP TABLE "room_specifications"`);
    await queryRunner.query(`DROP TABLE "specifications"`);
    await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "capacity" TO "description"`);
  }
}
