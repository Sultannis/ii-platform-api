import { getAndInitializeAppDataSource } from './get-and-initialize-app-data-source';

const clearDatabase = async () => {
  const AppDataSource = await getAndInitializeAppDataSource();

  try {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.clearDatabase();
    await queryRunner.release();

    console.log('Database cleared');
  } catch (error) {
    console.log('Fatal error: Failed to clear database');
    process.exit(1);
  }

  process.exit();
};

clearDatabase();
