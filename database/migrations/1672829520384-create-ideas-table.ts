import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createIdeasTable1672829520384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ideas',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            type: 'bigint',
          },
          {
            name: 'author_id',
            type: 'bigint',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'subtitle',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'likes',
            type: 'int',
          },
          {
            name: 'created_at',
            default: 'now()',
            type: 'timestamptz',
          },
          {
            name: 'updated_at',
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
    await queryRunner.dropTable('ideas');
  }
}
