import { seedUsers } from '../seeders/users.seeder';
import { getAndInitializeAppDataSource } from './get-and-initialize-app-data-source';

export const seedDatabase = async () => {
  const AppDataSource = await getAndInitializeAppDataSource();

  await seedUsers(AppDataSource);
  console.log('\nDatabase seeded');
  process.exit(0);
};

seedDatabase();
