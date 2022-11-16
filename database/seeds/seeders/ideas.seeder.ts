import { DataSource } from 'typeorm';
import { IDEAS } from '../values/ideas';

export const seedIdeas = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository('IdeaDao');

  try {
    for (const value of IDEAS) {
      await repository.insert(value);
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Ideas`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Ideas seeded`);
};
