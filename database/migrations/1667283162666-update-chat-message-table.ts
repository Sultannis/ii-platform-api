import { MigrationInterface, QueryRunner } from "typeorm";

export class updateChatMessageTable1667283162666 implements MigrationInterface {
    name = 'updateChatMessageTable1667283162666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "reply_to" uuid`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "readed_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "readed_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "reply_to"`);
    }

}
