import { MigrationInterface, QueryRunner } from "typeorm";

export class createTagsTable1667599705161 implements MigrationInterface {
    name = 'createTagsTable1667599705161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "nickname" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birth_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "residence_country" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "residence_city" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "work_company" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "educational_institution" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telegram_nickname" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "linkedin_link" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "linkedin_link"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telegram_nickname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "educational_institution"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "work_company"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "residence_city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "residence_country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nickname"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
