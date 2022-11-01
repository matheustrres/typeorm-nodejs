import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667316174880 implements MigrationInterface {
  public name: string = 'Migration1667316174880'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "fk_student_profile"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8"`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "fk_student_profile" FOREIGN KEY ("student_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject_students" DROP CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "fk_subject_room"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "fk_student_profile"`);
    await queryRunner.query(`ALTER TABLE "subject_students" ADD CONSTRAINT "FK_c21cb589f287d725d3cdea9c0a8" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "fk_subject_room" FOREIGN KEY ("subject_room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "fk_student_profile" FOREIGN KEY ("student_profile") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
