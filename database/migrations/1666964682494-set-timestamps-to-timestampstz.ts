import { MigrationInterface, QueryRunner } from "typeorm";

export class setTimestampsToTimestampstz1666964682494 implements MigrationInterface {
    name = 'setTimestampsToTimestampstz1666964682494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD CONSTRAINT "FK_a193dbfa2c4ff1d687c10602982" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ideas" DROP CONSTRAINT "FK_a193dbfa2c4ff1d687c10602982"`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "ideas" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed_at" TIMESTAMP`);
    }

}
