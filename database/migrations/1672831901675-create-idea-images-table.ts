import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createIdeaImagesTable1672831901675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'idea_images',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            isPrimary: true,
            type: 'bigint',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'is_main',
            default: false,
            type: 'boolean',
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
