import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTagsTable1672830441710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            type: 'bigint',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            default: 'now()',
            type: 'timestamptz',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tags');
  }
}
