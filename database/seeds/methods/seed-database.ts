import { seedIdeas } from '../seeders/ideas.seeder';
import { seedUsers } from '../seeders/users.seeder';
import { seedTags } from '../seeders/tags.seeder';
import { getAndInitializeAppDataSource } from './get-and-initialize-app-data-source';

export const seedDatabase = async () => {
  const AppDataSource = await getAndInitializeAppDataSource();

  await seedUsers(AppDataSource);
  await seedIdeas(AppDataSource);
  // await seedTags(AppDataSource);
  console.log('\nDatabase seeded');
  process.exit(0);
};

seedDatabase();
