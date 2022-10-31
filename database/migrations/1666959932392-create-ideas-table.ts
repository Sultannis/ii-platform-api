import { MigrationInterface, QueryRunner } from 'typeorm';

export class createIdeasTable1666959932392 implements MigrationInterface {
  name = 'createIdeasTable1666959932392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ideas" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "required_financial_support" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6ab43f1e9b1cef0d8f3e56ce3a3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ideas"`);
  }
}
