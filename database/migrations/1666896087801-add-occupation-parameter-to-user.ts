import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOccupationParameterToUser1666896087801
  implements MigrationInterface
{
  name = 'addOccupationParameterToUser1666896087801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "occupation" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "occupation"`);
  }
}
