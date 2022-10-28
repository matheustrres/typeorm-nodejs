import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1666998249245 implements MigrationInterface {
  public name: string = 'Migration1666998249245'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c"`);
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8"`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c"`);
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "id" SET DEFAULT 'f7e78ec9-d5a9-4db1-8cc6-3dcba16bc3f7'`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "id" SET DEFAULT 'ac36ebe8-e9ed-453e-a7df-2623f0622c49'`);
    await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "id" SET DEFAULT '136110c9-5c15-4da1-81e4-786037a44fcb'`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8" FOREIGN KEY ("subject_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_ec73c7eef88b2a9c16dba618d7c" FOREIGN KEY ("student_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }
}
