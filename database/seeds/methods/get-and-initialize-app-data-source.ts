import { AppDataSource } from '../../app-data-source';
import { DataSource } from 'typeorm';

export const getAndInitializeAppDataSource = async (): Promise<DataSource> => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.error('Fatal error: Data Source was not initialized', err);
      process.exit(1);
    });

  return AppDataSource;
};
