import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667326912051 implements MigrationInterface {
  public name: string = 'Migration1667326912051'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "fk_student_profile"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_23a54a51dc1a861faf82fe70df6"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "student_profile"`);
    await queryRunner.query(`ALTER TABLE "profiles" ADD "profile_student" uuid`);
    await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "UQ_57645c9e62748841dca0795930d" UNIQUE ("profile_student")`);
    await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "fk_profile_student" FOREIGN KEY ("profile_student") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "fk_profile_student"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "UQ_57645c9e62748841dca0795930d"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "profile_student"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "student_profile" uuid`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_23a54a51dc1a861faf82fe70df6" UNIQUE ("student_profile")`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "fk_student_profile" FOREIGN KEY ("student_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }
}
