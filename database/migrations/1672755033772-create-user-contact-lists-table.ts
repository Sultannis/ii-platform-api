import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserContactListsTable1672755033772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_contact_lists',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            type: 'bigint',
          },
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linkedin_link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'github_link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telegram_nickname',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('user_contact_lists');
  }
}
