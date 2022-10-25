import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormconfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['dist/**/*.dao.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};

export const PostgresDataSource = new DataSource(ormconfig);
