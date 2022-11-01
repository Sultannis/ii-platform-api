import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeFinantialSupportParameterNullable1666960192101
  implements MigrationInterface
{
  name = 'makeFinantialSupportParameterNullable1666960192101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "required_financial_support" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "required_financial_support" SET NOT NULL`,
    );
  }
}
