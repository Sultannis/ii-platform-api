import { seedCharacteristics } from '../seeders/characteristics.seeder';
import { seedUsersWithRelations } from '../seeders/users.seeder';
import { getAndInitializeAppDataSource } from './get-and-initialize-app-data-source';

export const seedDatabase = async () => {
  const AppDataSource = await getAndInitializeAppDataSource();

  await seedCharacteristics(AppDataSource)
  await seedUsersWithRelations(AppDataSource);
  console.log('\nDatabase seeded');
  process.exit();
};

seedDatabase();
