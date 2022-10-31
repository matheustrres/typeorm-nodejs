import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1667239226419 implements MigrationInterface {
  public name: string = 'Migration1667239226419'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."profiles_accounttype_enum" AS ENUM('admin', 'default', 'student')`);
    await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "accountType" "public"."profiles_accounttype_enum" NOT NULL DEFAULT 'default', CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "student_profile" uuid`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_23a54a51dc1a861faf82fe70df6" UNIQUE ("student_profile")`);
    await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "fk_student_profile" FOREIGN KEY ("student_profile") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "fk_student_profile"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_23a54a51dc1a861faf82fe70df6"`);
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "student_profile"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "password" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "students" ADD "email" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "students" ADD "name" text NOT NULL`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TYPE "public"."profiles_accounttype_enum"`);
  }
}
