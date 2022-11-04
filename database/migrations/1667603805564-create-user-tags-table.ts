import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTagsTable1667603805564 implements MigrationInterface {
    name = 'createUserTagsTable1667603805564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tags" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "tag_id" bigint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "userId" bigint, "tagId" bigint, CONSTRAINT "PK_deef7519b4b9995a9ecc3f7e611" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1ab9c2a1f3ce0444387dd71ff88" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_41b7f83759d559ef8f7f5ad3396" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_41b7f83759d559ef8f7f5ad3396"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_1ab9c2a1f3ce0444387dd71ff88"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updated_at"`);
        await queryRunner.query(`DROP TABLE "user_tags"`);
    }

}
