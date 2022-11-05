import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTagRelation1667609803485 implements MigrationInterface {
    name = 'createUserTagRelation1667609803485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags_users_users" ("tagsId" bigint NOT NULL, "usersId" bigint NOT NULL, CONSTRAINT "PK_d289040f19432c1a224cb2f0d69" PRIMARY KEY ("tagsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9120bb390329b70ed62da7cec5" ON "tags_users_users" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_08ce10fa19e6b2b46bbfc6c1c3" ON "tags_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_tags_tags" ("usersId" bigint NOT NULL, "tagsId" bigint NOT NULL, CONSTRAINT "PK_3341c5e43f34ad2f7fb10d60480" PRIMARY KEY ("usersId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e36e86825bbc09e1fc9d3c83fb" ON "users_tags_tags" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9de46fe02d9d7488f92bedf417" ON "users_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "tags" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags_users_users" ADD CONSTRAINT "FK_9120bb390329b70ed62da7cec5b" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tags_users_users" ADD CONSTRAINT "FK_08ce10fa19e6b2b46bbfc6c1c34" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_e36e86825bbc09e1fc9d3c83fb0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176"`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_e36e86825bbc09e1fc9d3c83fb0"`);
        await queryRunner.query(`ALTER TABLE "tags_users_users" DROP CONSTRAINT "FK_08ce10fa19e6b2b46bbfc6c1c34"`);
        await queryRunner.query(`ALTER TABLE "tags_users_users" DROP CONSTRAINT "FK_9120bb390329b70ed62da7cec5b"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updated_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9de46fe02d9d7488f92bedf417"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e36e86825bbc09e1fc9d3c83fb"`);
        await queryRunner.query(`DROP TABLE "users_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08ce10fa19e6b2b46bbfc6c1c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9120bb390329b70ed62da7cec5"`);
        await queryRunner.query(`DROP TABLE "tags_users_users"`);
    }

}
