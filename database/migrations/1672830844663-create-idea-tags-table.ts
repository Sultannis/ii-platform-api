import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createIdeaTagsTable1672830844663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'idea_tags',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            type: 'bigint',
          },
          {
            name: 'idea_id',
            type: 'bigint',
          },
          {
            name: 'tag_id',
            type: 'bigint',
          },
          {
            name: 'created_at',
            default: 'now()',
            type: 'timestamptz',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['idea_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ideas',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ideas');
  }
}
