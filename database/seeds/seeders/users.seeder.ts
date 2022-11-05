import { DataSource } from 'typeorm';
import { USERS } from '../values/users';

export const seedUsers = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository('UserDao');

  try {
    for (const value of USERS) {
      await repository.insert(value);
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Users`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Users seeded`);
};
