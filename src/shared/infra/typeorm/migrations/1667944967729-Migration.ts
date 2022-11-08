import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667944967729 implements MigrationInterface {
  name = 'Migration1667944967729';
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL, "number" integer NOT NULL, "capacity" integer NOT NULL DEFAULT '40', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL, "name" text NOT NULL, "taughtBy" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subject_room" uuid, CONSTRAINT "REL_89abc4053d2fc58472ad67f1f9" UNIQUE ("subject_room"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "public"."profiles_accounttype_enum" AS ENUM('admin', 'default', 'student')`);
    await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "accountType" "public"."profiles_accounttype_enum" NOT NULL DEFAULT 'student', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profile_student" uuid, CONSTRAINT "REL_57645c9e62748841dca0795930" UNIQUE ("profile_student"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "room_specifications" ("room_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_4c3dfb29c675bcb80e22c00da23" PRIMARY KEY ("room_id", "specification_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_19212a4f306551d2961cdf93ae" ON "room_specifications" ("room_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_55bb533d191aeef9df6c0ca117" ON "room_specifications" ("specification_id") `);
    await queryRunner.query(`CREATE TABLE "students_subjects" ("student_id" uuid NOT NULL, "subject_id" uuid NOT NULL, CONSTRAINT "PK_da0b057773369ac473d3ef0b966" PRIMARY KEY ("student_id", "subject_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_a26a54f94cbdaf7d93d6ebbc71" ON "students_subjects" ("student_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_e8938559b6116db50f9bc02000" ON "students_subjects" ("subject_id") `);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "fk_profile_student" FOREIGN KEY ("profile_student") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "room_specifications" ADD CONSTRAINT "FK_19212a4f306551d2961cdf93ae1" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "room_specifications" ADD CONSTRAINT "FK_55bb533d191aeef9df6c0ca1172" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "students_subjects" ADD CONSTRAINT "FK_a26a54f94cbdaf7d93d6ebbc713" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "students_subjects" ADD CONSTRAINT "FK_e8938559b6116db50f9bc020003" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students_subjects" DROP CONSTRAINT "FK_e8938559b6116db50f9bc020003"`);
    await queryRunner.query(`ALTER TABLE "students_subjects" DROP CONSTRAINT "FK_a26a54f94cbdaf7d93d6ebbc713"`);
    await queryRunner.query(`ALTER TABLE "room_specifications" DROP CONSTRAINT "FK_55bb533d191aeef9df6c0ca1172"`);
    await queryRunner.query(`ALTER TABLE "room_specifications" DROP CONSTRAINT "FK_19212a4f306551d2961cdf93ae1"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "fk_profile_student"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e8938559b6116db50f9bc02000"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a26a54f94cbdaf7d93d6ebbc71"`);
    await queryRunner.query(`DROP TABLE "students_subjects"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_55bb533d191aeef9df6c0ca117"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_19212a4f306551d2961cdf93ae"`);
    await queryRunner.query(`DROP TABLE "room_specifications"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TYPE "public"."profiles_accounttype_enum"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "specifications"`);
  }
  
}
