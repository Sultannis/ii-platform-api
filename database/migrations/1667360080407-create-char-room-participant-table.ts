import { MigrationInterface, QueryRunner } from "typeorm";

export class createCharRoomParticipantTable1667360080407 implements MigrationInterface {
    name = 'createCharRoomParticipantTable1667360080407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_rooms" RENAME COLUMN "users_access" TO "type"`);
        await queryRunner.query(`CREATE TABLE "chat_room_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" bigint NOT NULL, "room_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2fb4058c329ab4f75ba14443764" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_rooms" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "chat_rooms" ADD "type" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "chat_room_participants" ADD CONSTRAINT "FK_237a461670a367124c22581eb80" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_room_participants" ADD CONSTRAINT "FK_7930a06c7ccf3e17d3e262226b0" FOREIGN KEY ("room_id") REFERENCES "chat_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room_participants" DROP CONSTRAINT "FK_7930a06c7ccf3e17d3e262226b0"`);
        await queryRunner.query(`ALTER TABLE "chat_room_participants" DROP CONSTRAINT "FK_237a461670a367124c22581eb80"`);
        await queryRunner.query(`ALTER TABLE "chat_rooms" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "chat_rooms" ADD "type" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "chat_room_participants"`);
        await queryRunner.query(`ALTER TABLE "chat_rooms" RENAME COLUMN "type" TO "users_access"`);
    }

}
