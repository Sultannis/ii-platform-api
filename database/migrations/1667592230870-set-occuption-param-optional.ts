import { MigrationInterface, QueryRunner } from "typeorm";

export class setOccuptionParamOptional1667592230870 implements MigrationInterface {
    name = 'setOccuptionParamOptional1667592230870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "occupation" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "occupation" SET NOT NULL`);
    }

}
