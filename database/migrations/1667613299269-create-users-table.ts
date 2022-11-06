import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1667613299269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'bigint',
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'occupation',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'residence_country',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'residence_city',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'work_company',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'educational_institution',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'telegram_nickname',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'linkedin_link',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'smallint',
            default: 1,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'confirmed_at',
            type: 'timestamptz',
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
    await queryRunner.dropTable('users');
  }
}
