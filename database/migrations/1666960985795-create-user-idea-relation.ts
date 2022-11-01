import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserIdeaRelation1666960985795 implements MigrationInterface {
  name = 'createUserIdeaRelation1666960985795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ideas" ADD "userId" bigint`);
    await queryRunner.query(
      `ALTER TABLE "ideas" ADD CONSTRAINT "FK_a442e55818c36685ba0d6c40327" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ideas" DROP CONSTRAINT "FK_a442e55818c36685ba0d6c40327"`,
    );
    await queryRunner.query(`ALTER TABLE "ideas" DROP COLUMN "userId"`);
  }
}
