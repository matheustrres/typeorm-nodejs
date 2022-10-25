import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1666705848959 implements MigrationInterface {
  public name: string = 'Migration1666705848959'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_64bb2d8544299bbde670698ac37"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "videos" ADD "id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "room_id"`);
    await queryRunner.query(`ALTER TABLE "videos" ADD "room_id" uuid`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "PK_1a023685ac2b051b4e557b0b280"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD "id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_a05f10c497f5f7db3022664a6d6" PRIMARY KEY ("subject_id")`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f227421d2ef64ab086261ac07f"`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP COLUMN "room_id"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD "room_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_a05f10c497f5f7db3022664a6d6"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("subject_id", "room_id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_f227421d2ef64ab086261ac07fd" PRIMARY KEY ("room_id")`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a05f10c497f5f7db3022664a6d"`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP COLUMN "subject_id"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD "subject_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_f227421d2ef64ab086261ac07fd"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("room_id", "subject_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
    await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_64bb2d8544299bbde670698ac37" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_64bb2d8544299bbde670698ac37"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a05f10c497f5f7db3022664a6d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f227421d2ef64ab086261ac07f"`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_f227421d2ef64ab086261ac07fd" PRIMARY KEY ("room_id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP COLUMN "subject_id"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD "subject_id" integer NOT NULL`);
    await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_f227421d2ef64ab086261ac07fd"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("subject_id", "room_id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_a05f10c497f5f7db3022664a6d6" PRIMARY KEY ("subject_id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP COLUMN "room_id"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD "room_id" integer NOT NULL`);
    await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
    await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "PK_a05f10c497f5f7db3022664a6d6"`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("room_id", "subject_id")`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "PK_1a023685ac2b051b4e557b0b280"`);
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "room_id"`);
    await queryRunner.query(`ALTER TABLE "videos" ADD "room_id" integer`);
    await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "videos" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_64bb2d8544299bbde670698ac37" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
