import connectionConfig from '../src/common/configs/connection.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: connectionConfig.host,
  port: connectionConfig.port,
  username: connectionConfig.username,
  password: connectionConfig.password,
  database: connectionConfig.database,
  entities: ['src/common/dao/*{.ts,.js}'],
  migrations: ['database/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
