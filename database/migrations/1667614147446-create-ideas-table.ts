import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createIdeasTable1667614147446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ideas',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'bigint',
          },
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'subtitle',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ideas');
  }
}
