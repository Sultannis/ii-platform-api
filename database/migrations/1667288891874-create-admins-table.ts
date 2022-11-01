import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdminsTable1667288891874 implements MigrationInterface {
  name = 'createAdminsTable1667288891874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ideas" DROP CONSTRAINT "FK_a442e55818c36685ba0d6c40327"`,
    );
    await queryRunner.query(
      `CREATE TABLE "idea-images" ("id" BIGSERIAL NOT NULL, "idea_id" bigint NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_beea97388dbeef9afeac2329181" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" BIGSERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" smallint NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "idea-images" ADD CONSTRAINT "FK_b8957267214ebff92e4fe57b979" FOREIGN KEY ("idea_id") REFERENCES "ideas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "idea-images" DROP CONSTRAINT "FK_b8957267214ebff92e4fe57b979"`,
    );
    await queryRunner.query(`ALTER TABLE "ideas" ADD "userId" bigint`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "idea-images"`);
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD CONSTRAINT "FK_a442e55818c36685ba0d6c40327" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
