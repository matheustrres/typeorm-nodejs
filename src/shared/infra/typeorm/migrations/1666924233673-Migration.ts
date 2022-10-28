import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1666924233673 implements MigrationInterface {
  public name: string = 'Migration1666924233673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT '10bc0696-da42-46fe-bba7-e2b077220dee', "name" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT '0a43034d-ecf5-404c-9fa6-10b0abb6109a', "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT 'b37bf610-57d5-4356-b5a7-25b7f7cece16', "name" text NOT NULL, "taughtBy" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subject_room" uuid, CONSTRAINT "REL_89abc4053d2fc58472ad67f1f9" UNIQUE ("subject_room"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "subject_students" ("subject_id" uuid NOT NULL, "student_id" uuid NOT NULL, CONSTRAINT "PK_d7cccb0760404e6dd5ab7732eab" PRIMARY KEY ("subject_id", "student_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_c21cb589f287d725d3cdea9c0a" ON "subject_students" ("subject_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_ec73c7eef88b2a9c16dba618d7" ON "subject_students" ("student_id") `);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c"`);
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ec73c7eef88b2a9c16dba618d7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c21cb589f287d725d3cdea9c0a"`);
    await queryRunner.query(`DROP TABLE "subject_students"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
  }
}