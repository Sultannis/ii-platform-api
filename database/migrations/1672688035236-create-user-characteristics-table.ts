import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserCharacteristicsTable1672688035236
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_characteristics',
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
            name: 'characteristic_id',
            type: 'bigint',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
          {
            columnNames: ['characteristic_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'characteristics',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_characteristics');
  }
}
